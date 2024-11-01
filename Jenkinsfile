#!/usr/bin/env groovy

pipeline {

  agent {
    node {
        label 'docker'
      }
  }

  environment {
      CALCULATED_DOCKER_TAG = "${BRANCH_NAME}_${BUILD_NUMBER}".replace('/','_')
  }

  stages {
       stage('Build Image'){
         steps {
            script {
              docker.withRegistry(
                    'https://medneo-docker.jfrog.io',
                    'jfrogDockerRegistryCredentials',
                    {
                        // first build the test stage
                        // that will run all tests and fail in case the tests fail
                        sh "docker build -t medneo-docker.jfrog.io/vault-otp-ui-test:" + env.CALCULATED_DOCKER_TAG + " --target test ."
                        sh "docker build -t medneo-docker.jfrog.io/vault-otp-ui:" + env.CALCULATED_DOCKER_TAG + " --target prod ."
                    }
              )
           }

         }
       }
       stage('Release'){
         when {
           tag "release-*";
         }
         steps {
           script {
              docker.withRegistry(
                    'https://medneo-docker.jfrog.io',
                    'jfrogDockerRegistryCredentials',
                    {
                      sh "docker tag medneo-docker.jfrog.io/vault-otp-ui:" + env.CALCULATED_DOCKER_TAG + " medneo-docker.jfrog.io/vault-otp-ui:" + env.TAG_NAME.substring(8)
                      sh "docker push medneo-docker.jfrog.io/vault-otp-ui:" + env.TAG_NAME.substring(8)
                      sh "docker tag medneo-docker.jfrog.io/vault-otp-ui:" + env.TAG_NAME.substring(8) + " medneo-docker.jfrog.io/vault-otp-ui:latest"
                      sh "docker push medneo-docker.jfrog.io/vault-otp-ui:latest"
                    }
              )

           }

         }
       }

   }

}