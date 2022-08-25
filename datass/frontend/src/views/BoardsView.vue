<template>
  <div class="boards mt-3">
    <div class="col-12 row px-md-5 mx-0" :list="boards" group="boards">
      <div
        class="col-xl-2 col-md-4 col-sm-6 col-12 my-2"
        v-for="(board, boardindex) in boards"
        :key="board._id"
        :index="boardindex"
        >
          <b-card
          overlay
          footer=""
          footer-tag="footer"
          :img-src="board.background"
          img-alt="Card Image"
          text-variant="white"
          :title="board.name"
        >
          <b-link :to="'/boards/' + board._id">
            <div style="height: 260px; width: 100%; position: absolute; left: 0px; top: 0px;"></div>
          </b-link>
          </b-card>
          <div class="board-card-footer d-flex justify-content-between px-1 align-items-center">
            <div>
              <b-img :src="$store.state.auth.user.avatar" class="rounded-circle card-avatar"></b-img> &nbsp;
              <VueMomentsAgo prefix="You - " suffix="ago" :date="board.time" lang="en"></VueMomentsAgo>
            </div>
            <b-icon icon="file-earmark-excel-fill" class="remove-board" v-on:click="removeBoard(board._id)"></b-icon>
          </div>
      </div>
      <div class="col-xl-2 col-md-4 col-sm-6 col-12 my-2 board-card">
        <!-- <div class="new-board">
          <span class="board-text">Add a board...</span>
        </div> -->
        <div class="board-page">
          <form @submit.prevent="boardSubmit">
            <div class="floating-label-group mt-5">
              <b-form-input
                type="text"
                id="boardname"
                class="p-0"
                autocomplete="off"
                required
                v-model="boardname"
                :state="boardnamevalidation"
              >
              </b-form-input>
              <b-form-invalid-feedback :state="boardnamevalidation" style="height: 20px;">
                Cannot be empty
              </b-form-invalid-feedback>
              <b-form-valid-feedback :state="boardnamevalidation" style="height: 20px;">
              </b-form-valid-feedback>
              <span class="floating-label" for="boardname">Name</span>
            </div>

            <div class="floating-label-group mt-4">
              <b-form-input
                type="text"
                id="boardback"
                class="p-0"
                autocomplete="off"
                required
                v-model="boardback"
                :state="boardbackvalidation"
              >
              </b-form-input>
              <b-form-invalid-feedback :state="boardbackvalidation" style="height: 20px;">
                Cannot be empty
              </b-form-invalid-feedback>
              <b-form-valid-feedback :state="boardbackvalidation" style="height: 20px;">
              </b-form-valid-feedback>
              <span class="floating-label">Background</span>
            </div>
            <div style="height: 60px;" class="d-flex align-items-center">
              <button type="submit" class="btn create-btn" :disabled="!boardname || !boardback">
                <b-spinner v-if="showSpinner"></b-spinner>
                <span v-if="!showSpinner">CREATE</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';
import VueMomentsAgo from 'vue-moments-ago';

export default {
  name: 'BoardsView',
  components: {
    VueMomentsAgo,
  },
  data() {
    return {
      // boards: '',
      timestamp: new Date(),
      showSpinner: false,
      boardname: '',
      boardback: 'https://images.unsplash.com/photo-1544604860-206456f08229?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
    };
  },
  computed: {
    boardnamevalidation() {
      return this.boardname.length > 0;
    },
    boardbackvalidation() {
      return this.boardback.length > 0;
    },
    ...mapGetters('boards', {
      findBoardsInStore: 'find',
    }),
    boards() {
      return this.findBoardsInStore({ query: {} }).data;
    },
  },
  methods: {
    removeBoard(id) {
      axios.delete(`http://192.168.111.112:3030/boards/${id}`).then((res) => {
        console.log('removed res ', res.data.id);
        const index = this.boards.map((data) => data._id).indexOf(id);
        this.boards.splice(index, 1);
      });
    },
    boardSubmit() {
      axios
        .post('http://192.168.111.112:3030/boards', {
          name: this.boardname, background: this.boardback, time: this.timestamp, userid: this.$store.state.auth.user._id,
        })
        .then(
          () => {
            // this.boards.push(res.data);
            this.boardname = '';
            this.boardback = 'https://images.unsplash.com/photo-1544604860-206456f08229?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80';
            this.timestamp = new Date();
          },
        );
    },
    ...mapActions('boards', {
      findBoards: 'find',
    }),
  },
  created() {
    this.findBoards({ query: { $sort: { time: 1 } } });
  },
};
</script>

<style scoped>
  .floating-label-group {
  position: relative;
  margin-top: 15px;
  margin-bottom: 25px;
}
.floating-label-group .floating-label {
  font-size: 16px;
  color: #1976d2;
  position: absolute;
  pointer-events: none;
  top: 0px;
  left: 0px;
  transition: all 0.3s ease;
}
.floating-label-group .form-control.is-invalid:focus ~ .floating-label {
  top: -15px;
  bottom: 0px;
  left: 0px;
  font-size: 12px;
  opacity: 1;
  color: red;
}
.floating-label-group .form-control.is-invalid ~ .floating-label {
   font-size: 16px;
    color: red;
    position: absolute;
    pointer-events: none;
    top: 0px;
    left: 0px;
    transition: all 0.3s ease;
}

.floating-label-group .form-control.is-valid ~ .floating-label {
  top: -15px;
  bottom: 0px;
  left: 0px;
  font-size: 12px;
  opacity: 1;
  color: #1976d2;
}

.form-control {
  background-color: transparent;
  border: none;
  border-radius: inherit;
  outline: none;
  width: 100%;
  font-size: 1em;
  box-sizing: border-box;
  padding-bottom: 5px;
  border-bottom: 2px solid #797979;
}

.form-control:focus {
  border-bottom: solid 2px #1976d2;
  transition: 1s;
  -webkit-box-shadow: none !important;
}

.form-control.is-valid, .form-control.is-valid:focus{
  background: none;
  border-color: #1976d2
}

.form-control.is-invalid{
  background: none;
}

.form-control.is-invalid:focus{
  background: none;
}
.card-footer {
  background-color: #fff;
  color: #000;
  height: 60px;
  display: flex;
  align-items: center;
}
.card {
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12)!important;
  cursor: pointer;
  height: 260px;
}

.card-img {
  height: 200px;
}

.card-avatar {
  height: 20px;
}
.board-card-footer {
  position: relative;
  bottom: 40px;
}
.remove-board {
  cursor: pointer;
}
.remove-card:hover {
  transform: scale(1.5);
}

.vue-moments-ago {
  font-size: 14px;
}

.new-board {
  cursor: pointer;
  color: grey;
  background-color: #e0e0e0;
  border-color: #e0e0e0;
  border-radius: 2px;
}

.board-text {
  padding-left: 4px;
}

.new-board:hover {
  color: black;
  background-color: #bdbdbd;
  border-color: #bdbdbd;
}
.new-board:hover .board-text {
  text-decoration: underline;
}

.board-card {
  background-color: #fff;
  border-color: #fff;
  color: rgba(0,0,0,.87);
  border-radius: 2px;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);
  height: 260px;
}

.create-btn {
  background-color: #4caf50;
  border-color: #4caf50;
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
  color: #fff;
  font-weight: 500;
  cursor: pointer;
  min-width: 88px;
}

.create-btn:hover {
  color: #fff;
}

.create-btn:disabled {
  background-color: rgba(0,0,0,.12);
  color: rgba(0,0,0,.26);
  font-weight: 400;
  box-shadow: none;
  border-color: rgba(0,0,0,.12);
  outline: 0;
  min-width: 88px;
}
</style>
