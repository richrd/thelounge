<template>
	<div
		:aria-label="localeDate"
		class="date-marker-container tooltipped tooltipped-s">
		<div class="date-marker">
			<span
				:data-label="friendlyDate()"
				class="date-marker-text" />
		</div>
	</div>
</template>

<script>

const constants = require("../js/constants");

export default {
	name: "DateMarker",
	props: {
		message: Object,
	},
	computed: {
		localeDate() {
			return (new Date(this.message.time)).toLocaleDateString(constant.dateTimeLocale, {month: "long", year: "numeric", day: "numeric"});
		},
	},
	mounted() {
		if (this.hoursPassed() < 48) {
			this.$root.$on("daychange", this.dayChange);
		}
	},
	beforeDestroy() {
		this.$root.$off("daychange", this.dayChange);
	},
	methods: {
		hoursPassed() {
			return (Date.now() - Date.parse(this.message.time)) / 3600000;
		},
		dayChange() {
			this.$forceUpdate();

			if (this.hoursPassed() >= 48) {
				this.$root.$off("daychange", this.dayChange);
			}
		},
		friendlyDate() {
			const messageDate = new Date(this.message.time);

			const today = new Date();
			const yesterday = new Date(new Date(today).setDate(today.getDate() - 1));

			let dateString = messageDate.toLocaleDateString(constant.dateTimeLocale, {month: "long", year: "numeric", day: "numeric"});

			switch (messageDate.toDateString()) {
			case (today.toDateString()):
				dateString = "Today";
				break;
			case (yesterday.toDateString()):
				dateString = "Yesterday";
				break;
			}

			return dateString;
		},
	},
};
</script>
