jQuery.githubUser = function(user, callback) {
   jQuery.getJSON('https://api.github.com/users/'+user+'/repos?callback=?',callback)
}

jQuery.fn.listRepos = function(user) {
    this.html("<span>Pulling " + user +"'s GitHub repositories</span>");

    var target = this;

    $.githubUser(user, function(data) {
        var repos = data.data;
        sortByName(repos);

        var list = $('<table><thead><tr><th>Name</th><th>Created</th><th>Language</th><th>Description</th></tr></thead><tbody>');
        target.empty().append(list);
        $(repos).each(function() {
            if (this.name != (user.toLowerCase()+'.github.com')) {
                list.append('<tr><td><a href="' + (this.homepage?this.homepage:this.html_url) +'">' + this.name + '</a></td><td>' + this.created_at + '</td><td>' + this.language + '</td><td>' + this.description + '</td></tr>');
            }
        });
        list.append('</tbody></table>');
      });

    function sortByName(repos) {
        repos.sort(function(a,b) {
        return a.name - b.name;
       });
    }
};
