<template>
    <section class="p-4 bg-slate-200" v-for="item in datanya" :key="item.id">
        <div class="max-w-5xl mx-auto py-4 bg-white border shadow">
            <article class="overflow-hidden">
                <div class="bg-[white] rounded-b-md">
                    <div class="p-9">
                        <div class="space-y-1 text-slate-700">
                            <p class="text-xl font-extrabold tracking-tight uppercase font-body text-center">
                                Teman Bill
                            </p>
                        </div>
                    </div>
                    <div class="p-5">
                        <div class="w-full">
                            <div class="grid grid-cols-2 gap-4">
                                <div class="col-start-1 col-end-3 text-sm font-light text-slate-500">
                                    <p class="text-sm font-normal text-slate-700">
                                    Invoice Detail
                                    </p>
                                    <p>Name : {{item.name}}</p>
                                </div>
                                <div class="col-end-7 col-span-2 text-sm font-light text-slate-500 text-right">
                                    <p class="text-sm font-normal text-slate-700">Date</p>
                                    <p>{{ getDate() }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="p-5">
                    <div class="flex flex-col mx-0 mt-1 ">
                    <table class="min-w-full divide-y divide-slate-500">
                    <thead>
                        <tr>
                        <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0">
                        Description
                        </th>
                        <th scope="col" class="py-3.5 pl-3 pr-4 text-right text-sm font-normal text-slate-700 sm:pr-6 md:pr-0">
                        Price
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="border-b border-slate-200" v-for="val in item.item" :key="val.attr">
                            <td class="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                                <div class="font-medium text-slate-700">{{ val.attr }}
                                </div>
                                <!-- <div class="mt-0.5 text-slate-500 sm:hidden">
                                    {{ val.price }}
                                </div> -->
                            </td>
                            <td class="py-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                                {{ rupiah(val.price) }}
                            </td>
                        </tr>

                    </tbody>
                    <tfoot>
                        <tr>
                            <th scope="row" class="hidden pt-6 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0">
                            Subtotal
                            </th>
                            <th scope="row" class="pt-6 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden">
                            Subtotal
                            </th>
                            <td class="pt-6 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                            {{ rupiah(getTotal(item.item)) }}
                            </td>
                            </tr>
                            <tr>
                            <th scope="row" class="hidden pt-4 pl-6 pr-3 text-sm font-light text-right text-slate-500 sm:table-cell md:pl-0">
                            Tax
                            </th>
                            <th scope="row" class="pt-4 pl-4 pr-3 text-sm font-light text-left text-slate-500 sm:hidden">
                            Tax
                            </th>
                            <td class="pt-4 pl-3 pr-4 text-sm text-right text-slate-500 sm:pr-6 md:pr-0">
                             {{ rupiah(tax)}}
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" class="hidden pt-4 pl-6 pr-3 text-sm font-normal text-right text-slate-700 sm:table-cell md:pl-0">
                            Total
                            </th>
                            <th scope="row" class="pt-4 pl-4 pr-3 text-sm font-normal text-left text-slate-700 sm:hidden">
                            Total
                            </th>
                            <td class="pt-4 pl-3 pr-4 text-sm font-normal text-right text-slate-700 sm:pr-6 md:pr-0">
                            {{ rupiah(getTotal(item.item) + tax)}}
                            </td>
                        </tr>
                    </tfoot>
                    </table>
                    </div>
                    </div>

                </div>
            </article>
        </div>
    </section>
</template>

<script>
export default{
    name: 'bill',
    data(){
        return{
            datanya:JSON.parse(localStorage.getItem('apiData')),
            tax:Number(localStorage.getItem('tax'))
        }
    }, methods:{
        getDate(){
            var currentdate = new Date(); 
            var datetime =  currentdate.getDate() + "/"
                            + (currentdate.getMonth()+1)  + "/" 
                            + currentdate.getFullYear() + " @ "  
                            + currentdate.getHours() + ":"  
                            + currentdate.getMinutes() + ":" 
                            + currentdate.getSeconds();
            return datetime
        },
        getTotal(obj){
            return obj.reduce((total, val) => val.price + total,0)
        },
        rupiah(angka){
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR"
            }).format(angka);
        }
    }
}
</script>