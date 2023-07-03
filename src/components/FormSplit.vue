<template>
  <div class="container mx-auto p-2">
    <div class="mx-auto border rounded-lg shadow-lg p-5">
        <form @submit="submitForm">
            <div class="space-y-12">
                <div class="border-gray-900/10 pb-12">
                    <h2 class="text-xl font-semibold leading-7 text-gray-900 text-center">Split Bill</h2>
                    <p class="mt-1 text-sm leading-6 text-gray-600 text-center">Dengan Split Bill, pertemananmu tidak akan hancur hanya karena temanmu tidak membayar bill.</p>

                    <div class="border p-4 my-3" v-for="item in form" :key="item.id">
                        
                        <div class="p-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div class="sm:col-span-6">
                                <label for="username" class="block text-sm font-medium leading-6 text-gray-900">{{item.name}}</label>
                                <div class="mt-2">
                                    <input type="text" name="username" id="username" autocomplete="username" class="block border shadow rounded w-full bg-transparent py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Masukkan Nama Pemilik Bill" v-model="dataForm[item.id-1]['name']" required>
                                </div>
                            </div>
                        </div>
                        <div class="p-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6" v-for="index in item.count" :key="index">
                            <div class="sm:col-span-3">
                                <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">{{item.attr}}</label>
                                <div class="mt-2">
                                    <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Masukkan Nama Barang/Makanan" v-model="dataForm[item.id-1].item[index-1].attr" required>
                                </div>
                            </div>

                            <div class="sm:col-span-3">
                                <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">{{item.price}}</label>
                                <div class="mt-2">
                                    <input type="number" name="last-name" id="last-name" autocomplete="family-name" class="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Harga Barang/Makanan" v-model="dataForm[item.id-1].item[index-1].price" required>
                                </div>
                            </div>
                        </div>
                        <div class="p-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div class="sm:col-span-6">
                                <span class="text-blue-400/100 text-sm font-semibold cursor-pointer hover:text-blue-900" @click="addAttr(item.id)">+ Tambah Jenis Makanan / Barang</span>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <span class="py-4 text-blue-400/100 text-sm font-semibold cursor-pointer hover:text-blue-900" @click="addPemilik">+ Tambah Pemilik Bill</span>
                        <div class="sm:col-span-6">
                            <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Tax / Pajak (dalam persen %)</label>
                            <div class="mt-2">
                                <input type="text" name="tax" id="tax" autocomplete="tax" class="block border shadow rounded w-full bg-transparent py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Masukkan Tax" v-model="tax" required>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            
            <div class="mt-1 flex items-center justify-end gap-x-6">
                <!-- <router-link :to="{ name: 'Bill', params: { blog: JSON.stringify(dataForm) }}" custom v-slot="{ navigate } "> -->
                    <button type="button" class="text-sm font-semibold leading-6 text-gray-900" @click="refreshPage">Cancel</button>
                    <input type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" tag="button">
                <!-- </router-link> -->
            </div>
        </form>
    </div>
</div>
</template>

<script>
export default{
    name: 'FormSplit',
    data(){
        return{
            form:[
                {
                    id:1, name:'Nama Pemilik Barang', attr:'Nama Makanan / Barang', price:'Harga', count:1
                }
            ],
            dataForm:[{
                id:1,
                name:'',
                item:[{
                    attr: '',
                    price: '',
                }],
                // attr0:'',
                // price0:'',
                // init:0
            }],
            tax: ''
        }
    },
    methods:{
        addPemilik(){
            this.form.push({
                id:this.form.length+1, name:'Nama Pemilik Barang', attr:'Nama Makanan / Barang', price:'Harga',  count:1
            })
            this.dataForm.push({
                id:this.dataForm.length+1,
                name:'',
                item:[{
                    attr: '',
                    price: '',
                }],
                // init:0
            })
        },
        addAttr(res){
            Object.keys(this.dataForm).forEach(keys => {
                if(this.form[keys].id == res) {
                    console.log(this.dataForm[keys])
                    this.dataForm[keys].item.push ({
                        attr: '',
                        price: '',
                    })
                }
            });

            Object.keys(this.form).forEach(keys => {
                if(this.form[keys].id == res) {
                    this.form[keys].count += 1 
                }
            });
        },
        refreshPage(){
            window.location.reload();
        },
        submitForm(){
            localStorage.setItem("tax", this.tax)
            localStorage.setItem("apiData", JSON.stringify(this.dataForm))
            this.$router.push('/bill')
            // console.log(this.dataForm)
        }
    }
}
</script>