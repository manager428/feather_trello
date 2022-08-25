<template>
    <div>
        <b-modal ref="my-modal" title="Authentication Error" class="d-block invalid-modal" hide-header hide-footer>
            <div class="d-flex align-items-center">
                <b-icon icon="exclamation-circle-fill" style="zoom:2; fill: #6c757d;"></b-icon>
                <h5 class="ml-2">Authentication Error</h5>
            </div>
            <p class="mt-4">Invalid login</p>
            <div class="col-12 d-flex justify-content-end">
                <button class="btn-footer-ok" @click="hideModal()">ok</button>
            </div>
        </b-modal>
    </div>
</template>

<script>

export default {

  name: 'ModalView',
  methods: {
    showModal() {
      this.$refs['my-modal'].show();
    },
    hideModal() {
      this.$emit('showInvalidModal', false);
      this.$refs['my-modal'].hide();
    },
  },
  mounted() {
    this.showModal();
  },
  emits: ['showInvalidModal'],

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.modal{
    display: flex !important;
    align-items: center;
    justify-content: center;
}
.modal-content{
    max-width: 360px;
    margin: auto;
}
.btn-footer-ok{
    background-color: transparent;
    color: #43a047;
    height: 36px;
    font-weight: 500;
    font-size: 14px;
    min-width: 88px;
    text-transform: uppercase;
    border-style: none;
}
.btn-footer-ok:hover{
    background-color: #e9f4e9;
    color: #43a047;
    height: 36px;
    font-weight: 500;
    font-size: 14px;
    min-width: 88px;
    text-transform: uppercase;
    border-style: none;
}
</style>
