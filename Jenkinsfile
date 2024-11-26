pipeline {
    agent any
    environment {
        PATH = "/usr/bin:${env.WORKSPACE}/node_modules/.bin:${env.PATH}"
        BUILD_ID = 'dontKillMe'
        DISPLAY = ':99'
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
        stage('Compilar Aplicación') {
            steps {
                script {
                    dir('neon-threads') {
                        sh 'npm run build'
                    }
                }
            }
        }
        stage('Correr Pruebas de Selenium') {
            steps {
                script {
                    dir('neon-threads') {
                        // Levanta un servidor temporal usando el código recién construido
                        sh 'npm run start &'
                        wrap([$class: 'Xvfb', screen: '1920x1080x24']) {
                            // Espera un momento para que el servidor arranque
                            sleep time: 5, unit: 'SECONDS'
                            // Ejecuta las pruebas contra el servidor temporal
                            sh 'npx selenium-side-runner -c browserName=chrome tests/TestSelenium.side'
                        }
                        // Detiene el servidor temporal después de las pruebas
                        sh 'pkill -f "npm run start" || true'
                    }
                }
            }
        }
        stage('Desplegar') {
            steps {
                script {
                    // Detenemos el servicio existente
                    sh 'sudo systemctl stop frontend.service || true'

                    // Copiamos solo los archivos de compilación al directorio de despliegue
                    sh 'sudo cp -r ${WORKSPACE}/neon-threads/.next /home/ec2-user/pruebas-software-frontend/neon-threads/'

                    // Reiniciamos el servicio con el nuevo código
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
