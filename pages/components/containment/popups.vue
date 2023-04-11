<template>
  <BaseButton @click="popupToggler"> delete this world </BaseButton>
  <BasePopup v-model="popupVisible">
    <div style="width: 80vw; height: 60vh">
      Are you shure!?
      <br />
      <br />
      <BaseButtonList>
        <BaseButton @click="popupToggler2" size="xs"> Yes </BaseButton>
        <BaseButton @click="popupToggler" size="xs" color="acc">
          No
        </BaseButton>
      </BaseButtonList>
    </div>
  </BasePopup>
  <BasePopup v-model="popupVisible2">
    Are you really shure!?
    <br />
    <br />
    <BaseButtonList>
      <BaseButton @click="popupToggler2" size="xs" color="acc"> No </BaseButton>
      <BaseButton @click="popupToggler2" size="xs" color="acc"> No </BaseButton>
    </BaseButtonList>
  </BasePopup>
  <br />
  <br />
  Нужен какой-нибудь оберточный компонент, в котором будут вообще все
  всплывающие вещи. <br />
  Селекты, алерты, попапы, тултипы
</template>

<script>
export default {
  name: "popups",
  data: () => ({
    popupVisible: false,
    popupVisible2: false,
  }),
  methods: {
    popupToggler() {
      this.popupVisible = !this.popupVisible;
    },
    popupToggler2() {
      this.popupVisible2 = !this.popupVisible2;
    },
  },
};
</script>
