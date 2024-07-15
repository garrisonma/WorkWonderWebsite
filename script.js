document.addEventListener('DOMContentLoaded', function() {
    const contentDiv = document.getElementById('content');

    // Function to display a lesson
    function displayLesson(lesson) {
        const lessonDiv = document.createElement('div');
        lessonDiv.className = 'lesson';
        lessonDiv.innerHTML = `
            <h2>${lesson.title}</h2>
            <p>${lesson.content}</p>
            <button onclick="startQuiz(${lesson.id})">Start Quiz</button>
        `;
        contentDiv.appendChild(lessonDiv);
    }

    // Function to start a quiz for a specific lesson
    function startQuiz(lessonId) {
        contentDiv.innerHTML = '';
        const quizDiv = document.createElement('div');
        quizDiv.className = 'quiz';
        quizDiv.innerHTML = `
            <h2>Quiz for Lesson ${lessonId}</h2>
            <p>Question: What is ...?</p>
            <input type="text" id="answer">
            <button onclick="submitAnswer(${lessonId})">Submit</button>
        `;
        contentDiv.appendChild(quizDiv);
    }

    // Function to submit an answer for the quiz
    function submitAnswer(lessonId) {
        const answer = document.getElementById('answer').value;
        alert(`Your answer: ${answer}`);
        // Use AI prediction here
        predict([parseFloat(answer)]); // Example input to AI model
    }

    const lessons = [
        {id: 1, title: 'Lesson 1', content: 'This is the content for lesson 1'},
        {id: 2, title: 'Lesson 2', content: 'This is the content for lesson 2'}
    ];

    lessons.forEach(displayLesson);

    // Define a simple model in TensorFlow.js
    async function createAndTrainModel() {
        const model = tf.sequential();
        model.add(tf.layers.dense({units: 10, activation: 'relu', inputShape: [1]}));
        model.add(tf.layers.dense({units: 1}));

        model.compile({
            optimizer: 'sgd',
            loss: 'meanSquaredError'
        });

        // Generate some synthetic data for training
        const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
        const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);

        await model.fit(xs, ys, {
            epochs: 10
        });

        return model;
    }

    // Load or create and train the model
    let model;
    async function loadModel() {
        model = await createAndTrainModel();
    }

    // Function to make predictions
    async function predict(input) {
        if (!model) {
            await loadModel();
        }
        const tensor = tf.tensor2d([input], [1, 1]);
        const prediction = model.predict(tensor);
        prediction.print(); // Log prediction to console (or handle prediction as needed)
    }

    loadModel(); // Initialize the model when the page loads
    document.addEventListener('DOMContentLoaded', function() {
        const homeDiv = document.getElementById('home');
        const subjectContentDiv = document.getElementById('subject-content');
    
        const subjects = {
            math: 'Math',
            english: 'English',
            science: 'Science'
        };
    
        // Event listener for subject buttons
        document.querySelectorAll('.subject-button').forEach(button => {
            button.addEventListener('click', function() {
                const subject = this.classList[1];
                showSubject(subject);
            });
        });
    
        function showSubject(subject) {
            homeDiv.style.display = 'none';
            subjectContentDiv.style.display = 'block';
            subjectContentDiv.innerHTML = `<h2>${subjects[subject]}</h2>`;
            
            for (let i = 1; i <= 20; i++) {
                const lessonButton = document.createElement('button');
                lessonButton.className = 'lesson-button';
                lessonButton.textContent = `Lesson ${i}`;
                lessonButton.onclick = () => alert(`${subjects[subject]} - Lesson ${i}`);
                subjectContentDiv.appendChild(lessonButton);
            }
        }
    })
    
});
