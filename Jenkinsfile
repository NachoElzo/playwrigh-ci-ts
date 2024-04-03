pipeline {
    //will run in any agent
    agent any
    //tools need to me seted in jenkins tools section
    tools {
        nodejs "node"
    }
    //parameters for the execution
    parameters {
        string(
            name: "SPEC",
            defaultValue: "/tests ",
            description: "Test file or test name to execute (add double quotes to the test name)"
        )
        choice(
            name: "BROWSER",
            choices:["chromium", "firefox", "webkit", "iPhone12_safari"],
            description: "Project or browser to execute"
        )
    }
    //you need to install the plugin in jenkins
    options {
        ansiColor('xterm')
    }

    stages {
        stage('Build') {
            steps {
                echo "Building the developer master branch app"
            }
        }
        //will install dependecies and execute the npm script with the parameters created above to run playwright
        stage('Run Tests') {
            steps {
                script {
                    sh "npm install --force"
                    sh "npx playwright test ${SPEC} --project ${BROWSER}"
                }
            }
        }  
        stage('Deploy') {
            steps {
                script {
                    echo 'Deploying application if the test passed'
                }
            }
        }
    } 
    post {
        always {
            echo 'Sending results notification to slack'
        }
    }
}
