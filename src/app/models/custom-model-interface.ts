import { SALE_Order, SALE_OrderDetail } from "./model-list-interface";

export interface POS_Order extends SALE_Order
{
	OrderLines?: POS_OrderDetail[];
}

export interface POS_OrderDetail extends SALE_OrderDetail
{

}