Vue.component('editable-area', {
    props: ['value'],
    template: `
    <span class='editableArea'>
        <span v-show='!editing'><strong>{{value}}</strong></span>
        <input type="text" v-show='editing' :value='value' @input='triggerEdit'>
        <button @click='editing=!editing'>edit</button>
    </span>    
    `,
    data() {
        return {
            editing: false
        }
    },
    methods: {
        triggerEdit(e) {
            this.$emit('edit', e.currentTarget.value)
        }
    }
})