
function getRepos(){
  var repo_req = new XMLHttpRequest()
  var profile_req = new XMLHttpRequest()
  var username = document.getElementById('usernameInp').value

  $('#repo-list').empty();

  var repos_req_url = 'https://api.github.com/users/'+username+'/repos'
  var profile_req_url = 'https://api.github.com/users/'+username

  repo_req.open('GET',repos_req_url,true)
  profile_req.open('GET',profile_req_url,true)


  profile_req.onload= function(){
    var json_response = JSON.parse(this.response)

    if(json_response.message === 'Not Found'){
      window.alert('Incorrect Username')
    }else{
      console.log(json_response)


      var name = document.getElementById('name')
      var username = document.getElementById('username')
      var avatar = document.getElementById('avatar')

      if(json_response.name === null){
        name.innerText = 'No Name'
      }else{
        name.innerText = json_response.name
      }

      username.innerText = json_response.login
      avatar.src = json_response.avatar_url
    }

  }

  repo_req.onload = function(){
    var json_response = JSON.parse(this.response)
    console.log(json_response)

    if(json_response.message === 'Not Found'){

    }else{

      var html_status = ""

      $.each(json_response,function(i,status){

        var containerDiv = document.getElementById("repo-list")

        var repoCard = document.createElement('div')
        repoCard.className = 'repo-card'

        var repoLanguage = document.createElement('div')
        repoLanguage.className = 'repo-language'

        var repoLang = document.createElement('p')
        
        if(status.language === null){
          repoLang.innerText = 'Not Available'
        }else{
          repoLang.innerText = status.language
        }

        var repoDetails = document.createElement('div')
        repoDetails.className = 'repo-details'

        var repoName = document.createElement('h2')
        repoName.innerText = status.name

        var repoUrl = document.createElement('a')
        repoUrl.innerText = status.html_url
        repoUrl.href = status.html_url


        repoCard.appendChild(repoLanguage)
        repoLanguage.appendChild(repoLang)
        repoCard.appendChild(repoDetails)

        repoDetails.appendChild(repoName)
        repoDetails.appendChild(repoUrl)

        containerDiv.appendChild(repoCard)

      });
    }
    }

  repo_req.send()
  profile_req.send()

}
