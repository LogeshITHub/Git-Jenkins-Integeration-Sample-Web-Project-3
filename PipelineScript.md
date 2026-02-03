Backend : 

pipeline {
    agent any
    stages {
        stage('Stop Service') {
            steps {
                sh '''
                    echo "Stopping productapp service..."
                    sudo systemctl stop productapp.service || true
                    sleep 2
                '''
            }
        }
        
        stage('Deploy') {
            steps {
                git 'https://github.com/LogeshITHub/Git-Jenkins-Integeration-Sample-Web-Project-3a.git'
                sh '''
                    dotnet restore
                    dotnet build --configuration Release
                    dotnet publish ProductApp.API/ProductApp.API.csproj --configuration Release --output /tmp/publish
                    
                    sudo mkdir -p /var/www/productapp
                    sudo rm -rf /var/www/productapp/*
                    sudo cp -r /tmp/publish/* /var/www/productapp/
                    sudo chown -R www-data:www-data /var/www/productapp
                    sudo chmod -R 755 /var/www/productapp
                '''
            }
        }
        
        stage('Start Service') {
            steps {
                sh '''
                    echo "Starting productapp service..."
                    sudo systemctl daemon-reload
                    sudo systemctl enable productapp.service
                    sudo systemctl start productapp.service
                    sleep 3
                '''
            }
        }
    }
    
    post {
        success {
            echo '✅ Pipeline successful! Triggering React Web Job... likes DownStream Job'
            build job: 'Pipeline-Web-React-Dotnet-App-Superbase-PgsqlDB-2-Job-For-React-Web', wait: false
        }
        failure {
            echo '❌ Pipeline failed - attempting to restart service'
            sh '''
                sudo systemctl restart productapp.service || true
                echo "Service restart attempted"
            '''
        }
    }
}


Frontend : 

pipeline {
    agent any

    environment {
        // Set NODE_ENV to development so devDependencies (like vite) are installed
        NODE_ENV = 'development'
    }

    stages {
        stage('Stop Frontend Service') {
            steps {
                sh '''
                    echo "Stopping productapp-frontend service..."
                    sudo systemctl stop productapp-frontend.service || true
                '''
            }
        }

        stage('Build Frontend') {
            steps {
                git 'https://github.com/LogeshITHub/Git-Jenkins-Integeration-Sample-Web-Project-3a.git'

                dir('frontend') {
                    sh '''
                        set -e
                        echo "Workspace:"
                        pwd
                        
                        echo "Node & NPM versions"
                        node -v
                        npm -v

                        echo "Installing dependencies..."
                        # FIX: Using npm install + fresh start to ensure Linux-specific binaries
                        # (like @rollup/rollup-linux-x64-gnu) are installed. 
                        # Windows lockfiles often miss these.
                        rm -rf node_modules package-lock.json
                        npm install

                        echo "Ensure vite binary exists"
                        ls -l node_modules/.bin | grep vite

                        echo "Creating .env file for production"
                        # Set VITE_API_URL to point to the backend service.
                        # IMPORTANT: Replace YOUR_SERVER_IP with your server's public IP or domain name.
                        echo "VITE_API_URL=https://longest-glass-weapon-christopher.trycloudflare.com/api" > .env

                        echo "Build React app"
                        npm run build
                    '''
                }
            }
        }

        stage('Deploy Frontend') {
            steps {
                sh '''
                    echo "Deploying frontend..."
                    sudo mkdir -p /var/www/productapp-frontend
                    sudo rm -rf /var/www/productapp-frontend/*
                    sudo cp -r frontend/dist/* /var/www/productapp-frontend/
                    sudo chown -R www-data:www-data /var/www/productapp-frontend
                    sudo chmod -R 755 /var/www/productapp-frontend
                '''
            }
        }

        stage('Start Frontend Service') {
            steps {
                sh '''
                    echo "Starting productapp-frontend service..."
                    sudo systemctl daemon-reload
                    sudo systemctl enable productapp-frontend.service
                    sudo systemctl start productapp-frontend.service
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Frontend deployed successfully'
        }
        failure {
            echo '❌ Pipeline failed'
        }
    }
}