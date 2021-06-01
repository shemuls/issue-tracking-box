document.getElementById('issueSumbitForm').addEventListener('submit', submitIssue);

// Issue Submit from form by submitIssue Function
function submitIssue(e) {
    const getInputValue = id => document.getElementById(id).value;
    const issueType = getInputValue('issueType');
    const userName  = getInputValue('userName');
    const issueDesc = getInputValue('issueDesc');
    const issueId   = Math.floor(Math.random()*10000) + '';
    const status = 'Open';
    
    if (userName && issueDesc) {
        const issue = { issueId, status, issueType, userName, issueDesc };
        let issues = [];

        if (localStorage.getItem('issues')){
            issues = JSON.parse(localStorage.getItem('issues'));
        }
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
        showAllIssues();
    } else {
        const errorMessage = 'Name and Description field are required!';
        console.log(errorMessage);
    }
    
    document.getElementById('issueSumbitForm').reset();
    e.preventDefault();
}

const showAllIssues = () => {
    if (localStorage.getItem('issues')){
        const issues = JSON.parse(localStorage.getItem('issues'));
        const showAllIssuesHTML = document.getElementById('showAllIssuesHTML');
        showAllIssuesHTML.innerHTML='';

        for (let i = 0; i < issues.length; i++) {
            const issue = issues[i];
            console.log(issue.userName);
            showAllIssuesHTML.innerHTML += `
            
            <div class="col-md-6 mb-3">
              <div class="h-100 bg-dark rounded-3 p-5">
                <h6 class="text-muted">Issue ID:  ${issue.issueId}</h6>
                <span class="badge badge-warning bg-primary mb-3">Open</span>
                <p>${issue.issueDesc}</p>

                <p>
                  <svg class="bi" width="24" height="24"><use xlink:href="#people-circle"/></svg> <span class="text-muted" style="margin-left:10px; margin-right: 20px;">
                    ${issue.userName}
                  </span>
                  <svg class="bi" width="24" height="24"><use xlink:href="#speedometer2"/></svg><span class="text-muted" style="margin-left:10px">
                    ${issue.issueType}
                  </span>
                </p>

                <div class="issue-manage-btn mt-5">
                  <button class="btn btn-outline-warning btn-sm" type="button">Close</button>
                  <button class="btn btn-outline-danger btn-sm" type="button">Delete</button>
                </div>
              </div>
            </div>
            
            `;
        }

    }
}
showAllIssues();