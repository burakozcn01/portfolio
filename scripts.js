AOS.init({
    duration: 1000,
    once: true
});

$(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
        $('#scrollToTop').fadeIn();
    } else {
        $('#scrollToTop').fadeOut();
    }
});

$('#scrollToTop').click(function() {
    $('html, body').animate({ scrollTop: 0 }, 800);
    return false;
});

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});

$(document).ready(function(){
    const languageIcons = {
        "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
        "Python": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        "Java": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
        "C#": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
        "C++": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
        "Ruby": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg",
        "PHP": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
        "Go": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg",
        "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        "Swift": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg",
        "Kotlin": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg",
        "Rust": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg",
        "Dart": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
    };
    
    $.ajax({
        url: "https://api.github.com/users/halilibrahimd27/repos", 
        method: "GET",
        success: function(repos) {
            var projectContainer = $('#github-projects');
            if(repos.length === 0){
                projectContainer.append('<p class="text-center w-100">You have no projects yet.</p>');
                return;
            }
            repos.forEach(function(repo){
                var imageUrl = languageIcons[repo.language] || 'https://via.placeholder.com/400x200?text=Project+Image';
                var language = repo.language ? repo.language : 'Unknown';
                var stars = repo.stargazers_count ? repo.stargazers_count : 0;
                var forks = repo.forks_count ? repo.forks_count : 0;
                var projectCard = `
                    <div class="col-md-6 col-lg-4 mb-4" data-aos="fade-up">
                        <div class="card project-card h-100">
                            <img src="${imageUrl}" class="card-img-top project-image" alt="${repo.name}">
                            <div class="card-body d-flex flex-column">
                                <h5 class="card-title">${repo.name}</h5>
                                <p class="card-text project-description">${repo.description || 'No description.'}</p>
                                <div class="project-footer">
                                    <span class="badge badge-primary">${language}</span>
                                    <span class="badge badge-secondary"><i class="fas fa-star"></i> ${stars}</span>
                                    <span class="badge badge-secondary"><i class="fas fa-code-branch"></i> ${forks}</span>
                                </div>
                                <a href="${repo.html_url}" target="_blank" class="btn btn-sm btn-outline-primary mt-3">View Project</a>
                            </div>
                        </div>
                    </div>
                `;
                projectContainer.append(projectCard);
            });
        },
        error: function() {
            $('#github-projects').append('<p class="text-center w-100">An error occurred while loading projects.</p>');
        }
    });
});
