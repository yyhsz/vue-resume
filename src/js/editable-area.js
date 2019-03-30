Vue.component('editable-area', {
    props: ['value','preview'],
    template: `
    <span class='editableArea'>
        <span v-show='!editing'>{{value}}</span>
        <input type="tepreviewt" v-show='editing' :value='value' @input='triggerEdit'>
        <button @click='editing=!editing' v-show="!preview">edit</button>
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
