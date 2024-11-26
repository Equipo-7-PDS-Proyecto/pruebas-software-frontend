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
        stage('Correr Pruebas de Selenium') {
            steps {
                script {
                    dir('neon-threads') {
                    sh '''
                        # Iniciamos el entorno gráfico virtual
                        Xvfb :99 -screen 0 1920x1080x24 &

                        # Corremos las pruebas con Selenium Side Runner y el chromedriver de node_modules
                        npx selenium-side-runner -c "browserName=chrome" tests/TestSelenium.side
                        '''
                    }
                }
            }
        }
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
                    sh 'sudo cp -r ${WORKSPACE}/neon-threads/.next /home/ec2-user/pruebas-software-frontend/neon-threads/'

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
