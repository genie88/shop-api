var Tag = require('../models/tag.js');
var TagSvc = {};

TagSvc.saveTags = function(tags) {
  // create tag objects
  var tagObjects = tags.map(function (tag) {
    return {
      name: tag
    };
  });
  return Tags.forge()
  // fetch tags that already exist
  .query('whereIn', 'name', _.pluck(tagObjects, 'name'))
  .fetch()
  .then(function (existingTags) {
    var doNotExist = [];
    existingTags = existingTags.toJSON();
    // filter out existing tags
    if (existingTags.length > 0) {
      var existingSlugs = _.pluck(existingTags, 'name');
      doNotExist = tagObjects.filter(function (t) {
        return existingSlugs.indexOf(t.name) < 0;
      });
    }
    else {
      doNotExist = tagObjects;
    }
    // save tags that do not exist
    return new Tags(doNotExist).mapThen(function(model) {
      return model.save()
      .then(function() {
        return model.get('id');
      });
    })
    // return ids of all passed tags
    .then(function (ids) {
      return _.union(ids, _.pluck(existingTags, 'id'));
    });
  });
}

module.exports = TagSvc;