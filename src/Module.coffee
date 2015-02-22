moduleKeywords = ['extended', 'included']

class Module
  @getPrimitiveType: (obj) ->
    Object::toString.call(obj).slice(8, -1)

  @extend: (obj) ->
    for key, value of obj when key not in moduleKeywords
      @[key] = value

    obj.extended?.apply(@)
    this

  @include: (obj) ->
    for key, value of obj when key not in moduleKeywords
      # Assign properties to the prototype
      @::[key] = value

    obj.included?.apply(@)
    this

  @alias: (newName, original) ->
    @::[newName] = @::[original]

module.exports = Module