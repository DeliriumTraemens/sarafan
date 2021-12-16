var messageApi = Vue.resource('/message{/id}');

Vue.component('message-form',{
    props: ['messages','messageAttr'],
    data: function() {
        return{
            text:'',
            id:''
        }
    },
    watch:{
        messageAttr: function(newVal,oldVal){
            this.text=newVal.text;
            this.id=newVal.id;
        }
    },
    template: '<div>' +
            '<input type="text" placeholder="Write Some Post Here" v-model="text">' +
            '<input type="button" value="Save" @click="save">' +
        '</div>',
    methods:{
        save: function(){
            var message={text: this.text};
            messageApi.save({}, message).then(result =>
            result.json().then(data =>{
                this.messages.push(data);
                this.text ='';
            })
            )
        }
    }
});

Vue.component('message-row',{
    props:['bla','editMethod'],
    template: '<li> <i>({{bla.id }}) </i> {{ bla.text }} ' +
        '<span>' +
            '<input type="button" value="Edit" @click="edit">' +
        '</span>' +
        '</li> ',
    methods:{
        edit: function(){
            this.editMethod(bla)
        }
    }
})
//7:06

Vue.component('messages-list',{
    props:['messages','message'],
    data: function(){
        return{
            message:null
        }
    },
    template:
        '<div>' +
        '<message-form :messages="messages" :messageAttr="message"/>' +
        ' <message-row v-for="bla in messages" :key="bla.id" :bla="bla" :editMethod="editMethod"/> </div>',
    created: function(){
        messageApi.get().then(result =>
            result.json().then(data=>
                data.forEach(message => this.messages.push(message))
            )
        );
    },
    methods: {
        editMethod: function(bla) {
            this.message = bla;
        }
    }

});

var app = new Vue({
    el: '#app',
    template:'<messages-list :messages="messages"/>',
    data: {
        messages:[]
    }
});