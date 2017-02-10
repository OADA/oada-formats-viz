
const toggleSchemaExpander = [
  ({input,state}) => {
    let prev = state.get(['vocabsView', input.term]);
    if (!prev) {
      state.set(['vocabsView', input.term], {});
      prev = {};
    }
    if (prev.schemaExpanded)
      return state.set(['vocabsView', input.term, 'schemaExpanded'], false);
    return state.set(['vocabsView', input.term, 'schemaExpanded'], true);
  },
];

const toggleExampleExpander = [
  ({input,state}) => {
    let prev = state.get(['vocabsView', input.term]);
    if (!prev) {
      state.set(['vocabsView', input.term], {});
      prev = {};
    }
    if (prev.exampleExpanded)
      return state.set(['vocabsView', input.term, 'exampleExpanded'], false);
    return state.set(['vocabsView', input.term, 'exampleExpanded'], true);
  },
];

export {toggleExampleExpander,toggleSchemaExpander};
