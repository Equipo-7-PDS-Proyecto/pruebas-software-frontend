pipeline {
    agent any
    environment {
        PATH = "${env.WORKSPACE}/node_modules/.bin:${env.PATH}"
        BUILD_ID = 'dontKillMe'
    }
    tools {
        nodejs 'node js'
    }
    stages {
        stage('Instalar Dependencias') {
            steps {
                script {
                    dir('neon-threads') {
                        sh 'npm install'
                    }
                }
            }
        }
        //stage('Correr Tests') {
        //    steps {
        //        sh 'sudo systemctl stop frontend.service || true'
        //        sh 'npm run build && npx mocha --exit --reporter mocha-junit-reporter --reporter-options mochaFile=./reports/test-results.xml ./dist/app/test/**/*.js'
        //    }
        //    post {
        //        always {
        //            junit 'reports/test-results.xml'
        //        }
        //        failure {
        //            error('Tests failed')
        //        }
        //    }
        //}
        stage('Compilar Aplicación') {
            steps {
                script {
                    dir('neon-threads') {
                        sh 'npm run build'  // Asegúrate de que el comando build esté configurado en tu package.json
                    }
                }
            }
        }
        stage('Desplegar') {
            /* when {
                //Solo ejecuta esta etapa si las pruebas pasaron
                expression { currentBuild.result == null || currentBuild.result == 'SUCCESS' }
            } */
            steps {
                script {
                    // Detenemos el servicio antes de desplegar
                    sh 'sudo systemctl stop frontend.service || true'

                    // Copiamos solo los archivos de compilación al directorio de despliegue
                    sudo cp -r ${env.WORKSPACE}/neon-threads/.next /home/ec2-user/pruebas-software-frontend/neon-threads/

                    // Iniciamos el servicio con los nuevos archivos
                    sh 'sudo systemctl start frontend.service'
                }
            }
        }
    }
    post {
        always {
            archiveArtifacts artifacts: '**/logs/*.log', allowEmptyArchive: true
        }
        success {
            echo 'Despliegue exitoso.'
        }
        failure {
            echo 'El despliegue falló.'
        }
    }
}
