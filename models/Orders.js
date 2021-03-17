import moment from 'moment';

export class Order{
   
    constructor(id,items,totalAmount,date){
        this.id=id;
        this.items=items;
        this.totalAmount=totalAmount;
        this.date=date;
    }

    get getDateString(){

        return moment(this.date).format('MMMM D YYYY, hh:mm');
        
    }

    get getAmount(){
        return Math.round(this.totalAmount);
    }

}

export default Order;