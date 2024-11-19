
        const vehicles = {
            sedan: [
                { name: 'Toyota Camry', price: 28500, image: '/api/placeholder/400/300' },
                { name: 'Honda Accord', price: 27500, image: '/api/placeholder/400/300' }
            ],
            suv: [
                { name: 'Ford Explorer', price: 36500, image: '/api/placeholder/400/300' },
                { name: 'Tesla Model Y', price: 47990, image: '/api/placeholder/400/300' }
            ],
            electric: [
                { name: 'Tesla Model 3', price: 41190, image: '/api/placeholder/400/300' },
                { name: 'Nissan Leaf', price: 28140, image: '/api/placeholder/400/300' }
            ]
        };

        let currentPage = 1;
        let selectedType = '';
        let selectedVehicle = '';

        const pages = [
            document.getElementById('page1'),
            document.getElementById('page2'),
            document.getElementById('page3')
        ];

        const dots = [
            document.getElementById('dot1'),
            document.getElementById('dot2'),
            document.getElementById('dot3')
        ];

        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const vehicleSelection = document.getElementById('vehicleSelection');

        function updateProgress() {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index < currentPage);
            });
        }

        function changePage(direction) {
            pages[currentPage - 1].classList.remove('active');
            
            if (direction === 'next') {
                currentPage++;
                if (currentPage === 2) {
                    renderVehicles();
                }
            } else {
                currentPage--;
            }

            pages[currentPage - 1].classList.add('active');
            updateProgress();
            updateNavButtons();
        }

        function renderVehicles() {
            vehicleSelection.innerHTML = '';
            vehicles[selectedType].forEach(vehicle => {
                const card = document.createElement('div');
                card.classList.add('vehicle-card');
                card.innerHTML = `
                    <input type="radio" name="vehicle" value="${vehicle.name}" class="hidden-radio">
                    <img src="${vehicle.image}" alt="${vehicle.name}">
                    <h3>${vehicle.name}</h3>
                    <p>$${vehicle.price.toLocaleString()}</p>
                `;
                card.addEventListener('click', () => {
                    document.querySelectorAll('.vehicle-card').forEach(c => c.classList.remove('selected'));
                    card.classList.add('selected');
                    card.querySelector('input').checked = true;
                    selectedVehicle = vehicle.name;
                });
                vehicleSelection.appendChild(card);
            });
        }

        function updateNavButtons() {
            prevBtn.style.display = currentPage > 1 ? 'block' : 'none';
            nextBtn.textContent = currentPage === 3 ? 'Submit' : 'Next';
        }

        document.querySelectorAll('.vehicle-card[data-type]').forEach(card => {
            card.addEventListener('click', () => {
                document.querySelectorAll('.vehicle-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                card.querySelector('input').checked = true;
                selectedType = card.dataset.type;
            });
        });

        prevBtn.addEventListener('click', () => changePage('prev'));
        nextBtn.addEventListener('click', () => {
            if (currentPage < 3) {
                if ((currentPage === 1 && selectedType) || (currentPage === 2 && selectedVehicle)) {
                    changePage('next');
                }
            } else {
                alert('Form Submitted!');
            }
        });
    