pipeline {
  agent { label 'nodejs-16' }

  options {
    timestamps()
    disableConcurrentBuilds()
  }

  stages {
    stage('Install') {
      steps {
        sh 'npm ci --legacy-peer-deps'
      }
    }

    stage('Lint') {
      steps {
        sh 'npm run lint'
      }
    }

    stage('Unit Tests') {
      steps {
        sh 'npm run test:coverage'
      }
    }

    stage('Build') {
      steps {
        sh 'npm run build:prod'
      }
    }

    stage('E2E') {
      steps {
        sh 'npm run start:api &'
        sh 'npx ng serve --proxy-config proxy.conf.json &'
        sh 'npx wait-on http://localhost:4200 && npm run e2e'
      }
    }
  }

  post {
    always {
      sh 'pkill -f json-server || true'
      sh 'pkill -f "ng serve" || true'
    }
  }
}
