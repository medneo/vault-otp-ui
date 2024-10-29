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
                        app = docker.build('vault-otp-ui:' + env.CALCULATED_DOCKER_TAG)
                        //first push with our dedicated build tag
                        app.push()                         
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
                      app.push(env.TAG_NAME.substring(8))
                      app.push('latest')
                    }
              )

           }

         }
       }

   }

}