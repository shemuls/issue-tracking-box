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
        document.getElementById('errorMessage').innerHTML = '';
        showAllIssues();
    } else {
      const errorMessage = 'Name and Description field are required!';
      document.getElementById('errorMessage').innerHTML = `<p class="alert alert-danger">${errorMessage}<button onClick="closeMyAlert('myClose')" data-dismiss="alert"  id="myClose">&times;</button></p>`;
        
    }
    
    document.getElementById('issueSumbitForm').reset();
    e.preventDefault();
}

// Bootstrap alert close
function closeMyAlert(id) {
    if (id) {
      document.getElementById(id).addEventListener('click', function () {
        const h = this.parentElement;
        h.style.display = 'none';
      });
    }
}

// Update issues status
const updateIssueStatus = id => {
  if (id) {
    const issues = JSON.parse(localStorage.getItem('issues'));
    const currentIssue = issues.find(issue => issue.issueId == id);
    currentIssue.status = 'Closed';
    localStorage.setItem('issues', JSON.stringify(issues));
    showAllIssues();
  }
  
}

// Delete issues
const deleteIssue = id => {
  if (id) {
    const issues = JSON.parse(localStorage.getItem('issues'));
    const remainingIssue = issues.filter(issue => issue.issueId !== id);
    localStorage.setItem('issues', JSON.stringify(remainingIssue));
    showAllIssues();
  }
}


// Show all issues from browser storage
const showAllIssues = () => {
    if (localStorage.getItem('issues')){
        const issues = JSON.parse(localStorage.getItem('issues'));
        const showAllIssuesHTML = document.getElementById('showAllIssuesHTML');
        showAllIssuesHTML.innerHTML='';

        for (let i = 0; i < issues.length; i++) {
          const issue = issues[i];

            
            if (issue.status == 'Closed') {
              var badgeBg = 'bg-success';
            } else {
              var badgeBg = 'bg-warning';
            }
            
          
            showAllIssuesHTML.innerHTML += `
            
            <div class="col-md-6 mb-3">
              <div class="h-100 bg-dark rounded-3 p-5">
                <h6 class="text-muted">Issue ID:  ${issue.issueId}</h6>
                
                <span class="badge ${badgeBg} mb-3">${issue.status}</span>
                <p>${issue.issueDesc}</p>

                <p>
                  <i class="fa fa-user-o"></i> <span class="text-muted" style="margin-left:10px; margin-right: 20px;">
                    ${issue.userName}
                  </span>
                  <i class="fa fa-tachometer"></i><span class="text-muted" style="margin-left:10px">
                    ${issue.issueType}
                  </span>
                </p>

                <div class="issue-manage-btn mt-5">
                  <button onClick="updateIssueStatus('${issue.issueId}')" id="issueCloseBTN" class="btn btn-outline-warning btn-sm" type="button">Close</button>
                  <button onClick="deleteIssue('${issue.issueId}')" class="btn btn-outline-danger btn-sm" type="button">Delete</button>
                </div>
              </div>
            </div>
            
            `;
        }

    }
}
showAllIssues();
