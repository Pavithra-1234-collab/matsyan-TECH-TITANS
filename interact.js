<script>
        // Initialize app
        document.addEventListener('DOMContentLoaded', function() {
            // Set today's date as default
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('date').value = today;
            document.getElementById('catch-date').value = today;
            
            // Auto-detect location if possible
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    document.getElementById('location').value = `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`;
                });
            }
        });

        // Screen navigation
        function showScreen(screenId) {
            document.querySelectorAll('.screen').forEach(screen => {
                screen.classList.remove('active');
            });
            document.getElementById(screenId).classList.add('active');
        }

        // Slider value update
        function updateSliderValue(sliderId) {
            const slider = document.getElementById(sliderId);
            const valueElement = document.getElementById(sliderId + '-value');
            valueElement.textContent = slider.value + 'm';
        }

        // GPS location
        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    document.getElementById('location').value = `${position.coords.latitude.toFixed(6)}, ${position.coords.longitude.toFixed(6)}`;
                }, function() {
                    alert('Unable to get location. Please enter manually.');
                });
            } else {
                alert('Geolocation is not supported by this browser.');
            }
        }

        // Prediction function
        function predictCatch() {
            showScreen('result');
            
            // Show loading
            document.getElementById('loading').style.display = 'block';
            document.getElementById('results').style.display = 'none';
            
            // Simulate AI processing
            setTimeout(() => {
                // Hide loading and show results
                document.getElementById('loading').style.display = 'none';
                document.getElementById('results').style.display = 'block';
                
                // Generate predictions based on inputs
                const depth = parseInt(document.getElementById('depth').value);
                const sst = parseFloat(document.getElementById('sst').value) || 28;
                const tide = document.getElementById('tide').value;
                const moon = document.getElementById('moon').value;
                
                // Simple prediction logic
                const fishSpecies = ['Mackerel', 'Sardine', 'Tuna', 'Pomfret', 'Kingfish'];
                const species = fishSpecies[Math.floor(Math.random() * fishSpecies.length)];
                const weight = (Math.random() * 20 + 5).toFixed(1);
                
                document.getElementById('predicted-species').textContent = species;
                document.getElementById('predicted-weight').textContent = weight + ' kg';
                
                // Weather warning
                const warnings = [
                    'Moderate wind conditions expected. Safe for fishing.',
                    'High waves predicted. Exercise caution.',
                    'Perfect weather conditions for fishing!',
                    'Light rain expected. Bring waterproof gear.'
                ];
                document.getElementById('weather-warning').textContent = warnings[Math.floor(Math.random() * warnings.length)];
                
                // Trip estimates
                document.getElementById('fuel-estimate').textContent = (depth * 0.3 + Math.random() * 10).toFixed(1) + 'L';
                document.getElementById('time-estimate').textContent = (depth * 0.1 + Math.random() * 3 + 2).toFixed(1) + 'h';
                
                // Create depth chart
                createDepthChart();
            }, 3000);
        }

        // Create depth chart
        function createDepthChart() {
            const ctx = document.getElementById('depthChart').getContext('2d');
            
            // Generate sample data
            const depths = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
            const catches = depths.map(d => Math.max(0, 20 - d * 0.15 + Math.random() * 8));
            
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: depths.map(d => d + 'm'),
                    datasets: [{
                        label: 'Predicted Catch (kg)',
                        data: catches,
                        borderColor: '#3498db',
                        backgroundColor: 'rgba(52, 152, 219, 0.1)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Catch Weight (kg)'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Depth (meters)'
                            }
                        }
                    }
                }
            });
        }

        // Submit catch data
        function submitCatch() {
            const weight = document.getElementById('actual-weight').value;
            const fishType = document.getElementById('fish-type').value;
            
            if (!weight || !fishType) {
                alert('Please fill in the required fields (weight and fish type).');
                return;
            }
            
            // Simulate data submission
            setTimeout(() => {
                showScreen('thankyou');
            }, 1000);
        }

        // Rating function
        function rate(stars) {
            const starElements = document.querySelectorAll('.star');
            starElements.forEach((star, index) => {
                if (index < stars) {
                    star.classList.add('active');
                } else {
                    star.classList.remove('active');
                }
            });
            
            const messages = [
                'We appreciate your feedback!',
                'Thanks for rating! We\'ll improve.',
                'Good to know! We\'ll keep working.',
                'Great! We\'re glad it helped.',
                'Excellent! Thanks for using SmartFishNet!'
            ];
            
            document.getElementById('rating-text').textContent = messages[stars - 1];
        }

        // Language change handler
        document.getElementById('language').addEventListener('change', function() {
            const lang = this.value;
            // In a real app, this would trigger translation
            console.log('Language changed to:', lang);
        });
    </script>
