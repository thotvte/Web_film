import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from 'src/entities/invoice.entity';
import { Repository } from 'typeorm';
import { Products } from 'src/entities/product.entity';
import { InvoiceDetail } from 'src/entities/invoiceDetail';
import { InsertInvoiceTicketDetailsDto } from './dto/request/insert-ticketDetailsTicket.dto';
import { Ticket } from 'src/entities/ticket.entity';
import { InsertInvoiceEmployeeDto } from './dto/request/insert-invoiceEmployee.dot';
import { InsertInvoiceEmployeeResponse } from './dto/response/insert-invoiceEmployee.dto';
import { InsertInvoiceProductDetailsDto } from './dto/request/insert-invoiceProductDetails.dto';
import { InsertInvoiceCustomerDto } from './dto/request/insert-invoiceCustomer.dto';
import { InsertInvoiceCustomerResponse } from './dto/response/insert-invoiceCustomer.dto';
import { Seat } from 'src/entities/seat.entity';
import { Schedules } from 'src/entities/schedule.entity';
import { PriceSeatSchedules } from 'src/entities/priceSeatSchedule.entity';
import * as moment from 'moment';
import 'moment/locale/vi';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
    @InjectRepository(Products)
    private productsRepository: Repository<Products>,
    @InjectRepository(InvoiceDetail)
    private invoiceDetailRepository: Repository<InvoiceDetail>,
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
    @InjectRepository(Schedules)
    private schedulesRepository: Repository<Schedules>,
    @InjectRepository(PriceSeatSchedules)
    private priceSeatSchedulesRepository: Repository<PriceSeatSchedules>,
  ) {}

  async getInvoices() {
    return this.invoiceRepository.find({
      relations: ['invoiceDetails', 'employee', 'customer'],
    });
  }

  async getInvoicesId(id: number) {
    return this.invoiceRepository.find({
      where: { id },
      relations: ['invoiceDetails', 'employee', 'customer'],
    });
  }
  //-------------
  async saveInvoiceCustomer(
    invoiceData: InsertInvoiceCustomerDto,
    productInvoiceDetails: InsertInvoiceProductDetailsDto[],
    ticketInvoiceDetails: InsertInvoiceTicketDetailsDto[],
  ): Promise<InsertInvoiceCustomerResponse> {
    const save = await this.addInvoiceCustomer(
      invoiceData,
      productInvoiceDetails,
      ticketInvoiceDetails,
    );
    const saveInVoiceCustomer = await this.invoiceRepository.save(save);
    return saveInVoiceCustomer;
  }
  //-------------
  async saveInvoiceEmployee(
    invoiceData: InsertInvoiceEmployeeDto,
    productInvoiceDetails: InsertInvoiceProductDetailsDto[],
    ticketInvoiceDetails: InsertInvoiceTicketDetailsDto[],
  ): Promise<InsertInvoiceEmployeeResponse> {
    const save = await this.addInvoiceEmployee(
      invoiceData,
      productInvoiceDetails,
      ticketInvoiceDetails,
    );
    const saveInVoiceEmployee = await this.invoiceRepository.save(save);
    return saveInVoiceEmployee;
  }
  //----
  async addInvoiceCustomer(
    invoiceData: InsertInvoiceCustomerDto,
    productInvoiceDetails: InsertInvoiceProductDetailsDto[],
    ticketInvoiceDetails: InsertInvoiceTicketDetailsDto[],
  ): Promise<InsertInvoiceCustomerResponse> {
    moment.locale('vi');
    const newInvoice = this.invoiceRepository.create({
      ...invoiceData,
      total: 0,
      status: 0,
      invoiceDetails: [],
    });

    const TicketInvoiceDetailPromises = ticketInvoiceDetails.map(
      async (tkitem) => {
        const ticket = await this.ticketRepository.findOne({
          where: { id: tkitem.ticketId },
          relations: ['schedules', 'seat'],
        });

        const formattedDate = moment(ticket.schedules.startTime).format(
          'dddd, D MMMM, YYYY HH:mm:ss',
        );
        const invoiceDetail = this.invoiceDetailRepository.create({
          quantity: 1,
          name: `Phim : ${ticket.nameMovie}| Ghế : ${ticket.seat.name} | Lịch chiếu :${formattedDate}`,
          price: ticket.unitPrice,
          total: ticket.unitPrice * 1,
        });
        return invoiceDetail;
      },
    );

    const productInvoiceDetailPromises = productInvoiceDetails.map(
      async (item) => {
        const product = await this.productsRepository.findOne({
          where: { id: item.productId },
        });

        if (!product) {
          throw new Error(`ID : ${item.productId} Không tồn tại sản phẩm `);
        }

        const invoiceDetail = this.invoiceDetailRepository.create({
          quantity: item.quantity,
          price: product.price,
          name: product.name,
          total: product.price * item.quantity,
        });
        return invoiceDetail;
      },
    );

    const productInvoiceItems = await Promise.all(productInvoiceDetailPromises);
    const ticketInvoiceItems = await Promise.all(TicketInvoiceDetailPromises);
    newInvoice.invoiceDetails = [...productInvoiceItems, ...ticketInvoiceItems];
    newInvoice.total = newInvoice.invoiceDetails.reduce(
      (total, item) => total + item.total,
      0,
    );
    return newInvoice;
  }
  //----
  async addInvoiceEmployee(
    invoiceData: InsertInvoiceEmployeeDto,
    productInvoiceDetails: InsertInvoiceProductDetailsDto[],
    ticketInvoiceDetails: InsertInvoiceTicketDetailsDto[],
  ): Promise<InsertInvoiceEmployeeResponse> {
    moment.locale('vi');
    const newInvoice = this.invoiceRepository.create({
      ...invoiceData,
      total: 0,
      status: 0,
      invoiceDetails: [],
    });

    const TicketInvoiceDetailPromises = ticketInvoiceDetails.map(
      async (tkitem) => {
        const ticket = await this.ticketRepository.findOne({
          where: { id: tkitem.ticketId },
          relations: ['schedules', 'seat'],
        });

        const formattedDate = moment(ticket.schedules.startTime).format(
          'dddd, D MMMM, YYYY HH:mm:ss',
        );
        const invoiceDetail = this.invoiceDetailRepository.create({
          quantity: 1,
          name: `Phim : ${ticket.nameMovie}| Ghế : ${ticket.seat.name} | Lịch chiếu :${formattedDate}`,
          price: ticket.unitPrice,
          total: ticket.unitPrice * 1,
        });
        return invoiceDetail;
      },
    );

    const productInvoiceDetailPromises = productInvoiceDetails.map(
      async (item) => {
        const product = await this.productsRepository.findOne({
          where: { id: item.productId },
        });

        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found`);
        }

        const invoiceDetail = this.invoiceDetailRepository.create({
          quantity: item.quantity,
          price: product.price,
          name: product.name,
          total: product.price * item.quantity,
        });
        return invoiceDetail;
      },
    );

    const productInvoiceItems = await Promise.all(productInvoiceDetailPromises);
    const ticketInvoiceItems = await Promise.all(TicketInvoiceDetailPromises);
    newInvoice.invoiceDetails = [...productInvoiceItems, ...ticketInvoiceItems];
    newInvoice.total = newInvoice.invoiceDetails.reduce(
      (total, item) => total + item.total,
      0,
    );
    return newInvoice;
  }

  async updateStatusInvoice(id: number): Promise<string> {
    const invoiceId = await this.invoiceRepository.findOne({
      where: { id },
      relations: ['invoiceDetails'],
    });
    if (!invoiceId) {
      throw new NotFoundException(`không tìm thấy Invoice với id ${id}`);
    }
    invoiceId.status = 1;
    await this.invoiceRepository.save(invoiceId);
    return 'Đã thanh toán thành công ';
  }

  async cancelStatusInvoice(id: number): Promise<string> {
    const invoiceId = await this.invoiceRepository.findOne({
      where: { id },
      relations: ['invoiceDetails'],
    });
    if (!invoiceId) {
      throw new NotFoundException(`không tìm thấy Invoice với id ${id}`);
    }
    invoiceId.status = 2;
    await this.invoiceRepository.save(invoiceId);
    return 'Đã hủy thành công ';
  }

  async deleteInvoice(id: number): Promise<string> {
    await this.invoiceRepository.softRemove({ id });
    return 'Đã xóa thành công';
  }
}
