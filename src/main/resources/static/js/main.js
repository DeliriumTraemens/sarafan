var messageApi = Vue.resource('/message{/id}');

Vue.component('message-row',{
    props:['bla'],
    template: '<li> <i>({{bla.id }})</i> {{ bla.text}}</li> '
})

Vue.component('messages-list',{
    props:['messages'],
    // template: '<div> <div v-for="message in messages">{{message.text}}</div></div>'
    template: '<ul> <message-row v-for="bla in messages" :bla="bla" :key="bla.id"/> </ul>'
});

var app = new Vue({
    el: '#app',
    template:'<messages-list :messages="messages"/>',
    data: {
        messages:[
            {id:'123',text:'Wow'},
            {id:'234',text:'Show'},
            {id:'345',text:'How'}
        ]
    }
});