//13.43
function getIndex(list,id){
    for (var i = 0; i <list.length ; i++) {
        if(list[i].id === id){
            return i;
        }
    }
    return -1;
}

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
            if(this.id){
                messageApi.update({id:this.id},message).then(result =>
                    result.json().then(data =>{
                        var index=getIndex(this.messages, data.id);
                        this.messages.splice(index, 1, data);
                        this.text =''
                        this.id=''
                    })
                )
            } else
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
    props:['bla','editMethod','messages'],
    template: '<li> <i>({{bla.id }}) </i> {{ bla.text }} ' +
        '<span style="position:absolute; right: 0">' +
            '<input type="button" value="Edit" @click="edit">' +
            '<input type="button" value="x" @click="del">' +
        '</span>' +
        '</li> ',
    methods:{
        edit: function(){
            alert(this.bla.text);
            this.editMethod(this.bla)
        },
        del: function(){
            // alert(this.bla.id+' '+this.bla.text);
            messageApi.remove({id: this.bla.id}).then(result =>{
                if(result.ok){
                    this.messages.splice(this.messages.indexOf(this.bla), 1)
                }
            })
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
        '<div style="position:relative; width: 300px;">' +
        '<message-form v-bind:messages="messages" v-bind:messageAttr="message"/>' +
        ' <message-row v-for="bla in messages" :key="bla.id" :bla="bla" ' +
        ':messages="messages" :editMethod="editMethod"/> </div>',
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