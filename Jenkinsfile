pipeline {
    agent any
    stages {
      stage('Setup'){
        steps{
          sh '''
              sudo rm -rf /home/ricva_front/www/v2/*
              '''
        }
      }
      stage('Dependences'){
        steps{
          sh '''
              sudo npm install --legacy-peer-deps
            '''
        }
      }
      stage('Build packages') {
          steps {
              sh '''
              sudo npm run build authentification
              sudo npm run build ricva-cajou
              '''
          }
      }
      stage('Starting') {
          steps {
              sh '''
              sudo cp -rf * /home/ricva_front/www/v2
              sudo chown -Rf ricva_front:ricva_front /home/ricva_front/www/v2
              sudo systemctl restart apache2
              '''
          }
      }
    }
    post {
      always {
         sh "true"
      }
      failure {
          echo 'Angular deploying failed'
      }
      success {
          echo 'Angular deploying was a success'
      }
      unstable {
          echo 'Angular deploying has gone unstable'
      }

    }
}
