function skillsMember() {
  return {
    restrict: 'E',
    template: '<div></div>',
    link: function(scope, element, attrs) {
      var skills = scope.member.skills;
      var skillsList = '';
      for (var i = 0; i < skills.length; i++) {
        skillsList += '<span class="label label-default">' + skills[i] + '</span> ';
      }
      element.append(skillsList);
    }
  };
}