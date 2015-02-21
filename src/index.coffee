Function::property = (prop, desc) ->
  Object.defineProperty @prototype, prop, desc

module.exports =
  Graph: require('./Graph')
  Set: require('./Set')
  OrderedSet: require('./OrderedSet')
  LinkedList: require('./LinkedList')