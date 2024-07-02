import { AccountCusModule } from './accountCus/accountCus.module';
import { AccountEmployeeModule } from './accountEmp/accountEmployee.module';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { categoryModule } from './category/category.module';
import { CinemaModule } from './cinema/cinema.module';
import { CommentModule } from './comment/comment.module';
import { CustomerModule } from './customer/customer.module';
import { DeliveryBillModule } from './deliveryBill/deliveryBill.module';
import { DeliveryBillDetailModule } from './deliveryBillDetail/deliveryBillDetail.module';
import { EmployeeModule } from './employee/employee.module';
import { GenreModule } from './genre/genre.module';
import { InvoiceModule } from './invoice/invoice.module';
import { InvoiceDetailModule } from './invoiceDetail/invoiceDetail.module';
import { MovieModule } from './movie/movie.module';
import { PermissionModules } from './permission/permission.module';
import { PriceTypeSeatSchedulesModule } from './priceTypeSeatSchedule/priceSeatSchedule.module';
import { ProductItemModule } from './productitem/productItem.module';
import { ProductsModule } from './products/products.modules';
import { RoleModule } from './role/role.module';
import { SchedulesModule } from './schedules/schedule.module';
import { SeatModule } from './seat/seat.module';
import { SupplierModule } from './supplier/supplier.module';
import { TicketModule } from './ticket/ticket.module';
import { TypeSeatModule } from './typeseat/typeseat.module';

export default [
  GenreModule,
  MovieModule,
  SchedulesModule,
  CinemaModule,
  SeatModule,
  TypeSeatModule,
  TicketModule,
  categoryModule,
  SupplierModule,
  ProductItemModule,
  ProductsModule,
  InvoiceModule,
  InvoiceDetailModule,
  DeliveryBillModule,
  DeliveryBillDetailModule,
  RoleModule,
  AccountEmployeeModule,
  EmployeeModule,
  AccountCusModule,
  CustomerModule,
  AuthModule,
  PermissionModules,
  BlogModule,
  CommentModule,
  PriceTypeSeatSchedulesModule,
];
