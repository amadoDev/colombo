<template>
  <div class="competition">
    <div v-if="showCompetitors" class="competition-tabs">
      <a
        :class="{ active: tabs[0].active }"
        href="#"
        class="competition-tab"
        @click="setActive(0, $event)"
      >
        {{ $t('search_summary_title') }}
      </a>
      <a
        :class="{ active: tabs[1].active }"
        href="#"
        class="competition-tab"
        @click="setActive(1, $event)"
      >
        {{ $t('competence') }}
      </a>
    </div>
    <div class="competition-contents">
      <div :class="{ active: tabs[0].active }" class="competition-content">
        <position />
      </div>
      <div
        v-if="showCompetitors"
        :class="{ active: tabs[1].active }"
        class="competition-content"
      >
        <competition />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Position from '~/components/summary/search/detail/Position.vue'
import Competition from '~/components/summary/search/detail/Competition.vue'

export default {
  components: {
    Position,
    Competition
  },
  data: () => ({
    tabs: [
      {
        active: true
      },
      {
        active: false
      }
    ],
    showCompetitors: false
  }),
  computed: {
    ...mapGetters({
      summary: 'summary/summary'
    })
  },
  mounted() {
    const { summary } = this.summary
    this.hasCompetitors(summary.SearchCompetitorsBox)
  },
  methods: {
    hasCompetitors(competitors) {
      if (competitors !== 'not-analyzed') {
        this.showCompetitors = true
      }
    },
    setActive(index, e) {
      e.preventDefault()
      this.tabs.map(el => (el.active = false))
      this.tabs[index].active = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/css/vars';

.competition-tabs {
  margin-bottom: 30px;
}

.competition-tab {
  color: $white;
  text-decoration: none;
  text-transform: uppercase;
  margin-right: 28px;
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  display: inline-flex;
  align-items: center;
  padding: 4px 0;
  &.active {
    border-bottom: 5px solid $primary;
  }
}

.competition-content {
  &:not(.active) {
    display: none;
  }
}
</style>
