import upperFirst from "lodash/upperFirst";

export function genericCrudStore(name, pluralName, isSlug) {
  let pluralNameUpperFirst = upperFirst(pluralName);
  let nameUpperFirst = upperFirst(name);
  return {
    state: {
      [pluralName]: [],
      [`${pluralName}Links`]: [],
      [`${pluralName}SlugLinks`]: [],
      isAllLoaded: false,
    },
    mutations: {
      allLoaded(state) {
        state.isAllLoaded = true;
      },
      [`add${nameUpperFirst}`](state, data) {
        if (!data) {
          return false;
        }
        let idx = state[`${pluralName}Links`].indexOf(data._id);
        if (idx === -1) {
          state[pluralName].push(data);
          state[`${pluralName}Links`].push(data._id);
          if (isSlug) {
            state[`${pluralName}SlugLinks`].push(data.slug);
          }
        } else {
          state[pluralName][idx] = data;
        }
      },
      [`delete${nameUpperFirst}`](state, id) {
        let idx = state[`${pluralName}Links`].indexOf(id);
        if (idx === -1) {
          return;
        }
        state[pluralName].splice(idx, 1);
        state[`${pluralName}Links`].splice(idx, 1);
        if (isSlug) {
          state[`${pluralName}SlugLinks`].splice(idx, 1);
        }
      },
      [`edit${nameUpperFirst}`](state, payload) {
        let id = payload._id;
        let idx = state[`${pluralName}Links`].indexOf(id);
        if (idx === -1) {
          return;
        }
        for (let prop in payload) {
          state[pluralName][idx].prop = payload[prop];
        }
      },
    },
    actions: {
      // get all items
      async [`fetch${pluralNameUpperFirst}`]({ commit }, params) {
        await this[`$getAll${pluralNameUpperFirst}`](params).then((data) => {
          data.data.forEach((el) => {
            commit(`add${nameUpperFirst}`, el);
          });
        });
        commit("allLoaded");
      },
      // get item by id
      async [`fetch${nameUpperFirst}`]({ commit }, id) {
        await this[`$get${nameUpperFirst}`](id).then((data) => {
          commit(`add${nameUpperFirst}`, data.data);
          return data.data;
        });
      },
      // edit item by id
      async [`edit${nameUpperFirst}`]({ commit }, { _id, data }) {
        await this[`$edit${nameUpperFirst}`](_id, data).then(() => {
          commit(`edit${nameUpperFirst}`, { _id, ...data });
        });
      },
      // create item
      async [`create${nameUpperFirst}`]({ commit }, data) {
        await this[`$create${nameUpperFirst}`](data).then((data) => {
          commit(`add${nameUpperFirst}`, data.data);
        });
      },
      // delete item by id
      async [`delete${nameUpperFirst}`]({ commit }, id) {
        await this[`$delete${nameUpperFirst}`](id).then(() => {
          commit(`delete${nameUpperFirst}`, id);
        });
      },
    },
    getters: {
      [name]: (state) => (id) => {
        let idx = state[`${pluralName}Links`].indexOf(id);
        if (isSlug && idx === -1) {
          idx = state[`${pluralName}SlugLinks`].indexOf(id);
        }
        if (idx === -1) {
          return false;
        }
        return state[`${pluralName}`][idx];
      },
      [pluralName]: (state) => {
        if (state.isAllLoaded) {
          return state[pluralName];
        } else {
          return false;
        }
      },
    },
  };
}
