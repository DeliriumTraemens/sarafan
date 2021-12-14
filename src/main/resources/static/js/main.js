var messageApi = Vue.resource('/message{/id}');

Vue.component('message-form',{
    data: function() {
        return{
            text:''
        }
    },
    template: '<div>' +
            '<input type="text" placeholder="Write Some Post Here" v-model="text">' +
            '<input type="button" value="Save" @click="save">' +
        '</div>',
    methods:{
        click: function(){
            var message={text: this.text};
        }
    }
});

Vue.component('message-row',{
    props:['bla'],
    template: '<li> <i>({{bla.id }})</i> {{ bla.text}}</li> '
})

Vue.component('messages-list',{
    props:['messages'],
    template: '<ul> <message-row v-for="bla in messages" :bla="bla" :key="bla.id"/> </ul>',
    created: function(){
        messageApi.get().then(result =>
            result.json().then(data=>
                data.forEach(message => this.messages.push(message))
            )
        );
    }
});

var app = new Vue({
    el: '#app',
    template:'<messages-list :messages="messages"/>',
    data: {
        messages:[]
    }
});