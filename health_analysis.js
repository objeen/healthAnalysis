{
    "conditions"; [
      {
        "name": "Thyroid",
        "imagesrc": "thyroidillustration.jpg",
  }
  
        "symptoms"; [
          "Fatigue",
          "Weight gain or loss",
          "Dry skin",
          "Muscle weakness",
          "Irregular menstrual periods"
        ]
      ,
    ]
  
  }
  }
        "prevention"; [
          "Eat a balanced diet",
          "Exercise regularly",
          "Get regular check-ups"
        ],
        "treatment"; "Medication like levothyroxine may be prescribed by a doctor."
      },
      {
        "name"; "Diabetes",
        "imagesrc";"diabeties.jpg",
        "symptoms"; [
          "Frequent urination",
          "Increased thirst",
          "Blurry vision",
          "Fatigue",
          "Slow healing of cuts or sores"
        ],
        "prevention"; [
          "Maintain a healthy weight",
          "Follow a balanced diet",
          "Regular exercise"
        ],
        "treatment"; "Management includes medication, insulin therapy, and lifestyle changes."
      },
      {
        "name"; "High Blood Pressure",
        "imagesrc";"blood_pressure.jpg",
        "symptoms"; [
          "Headaches",
          "Shortness of breath",
          "Chest pain",
          "Dizziness",
          "Blurred or double vision"
        ],
        "prevention"; [
          "Reduce salt intake",
          "Exercise regularly",
          "Maintain a healthy weight"
        ],
        "treatment"; "Medications like ACE inhibitors or diuretics may be prescribed."
      }
      {
        const addPatientButton = document.getElementById("addPatient");
        const report = document.getElementById("report");
        const btnSearch = document.getElementById('btnSearch');
        const patients = [];
      }
      {
        function addPatient() {
            const name = document.getElementById("name").value;
            const gender = document.querySelector('input[name="gender"]:checked');
            const age = document.getElementById("age").value;
            const condition = document.getElementById("condition").value;
  
            if (name && gender && age && condition) {
              patients.push({ name, gender: gender.value, age, condition });
              resetForm();
              generateReport();
              function resetForm() {
                document.getElementById("name").value = "";
                document.querySelector('input[name="gender"]:checked').checked = false;
                document.getElementById("age").value = "";
                document.getElementById("condition").value = "";
              }
              {
                function searchCondition() {
                    const input = document.getElementById('conditionInput').value.toLowerCase();
                    const resultDiv = document.getElementById('result');
                    resultDiv.innerHTML = '';
            
                    fetch('health_analysis.json')
                      .then(response => response.json())
                      .then(data => {
                        const condition = data.conditions.find(item => item.name.toLowerCase() === input);
            
                        if (condition) {
                          const symptoms = condition.symptoms.join(', ');
                          const prevention = condition.prevention.join(', ');
                          const treatment = condition.treatment;
            
                          resultDiv.innerHTML += `<h2>${condition.name}</h2>`;
                          resultDiv.innerHTML += `<img src="${condition.imagesrc}" alt="hjh">`;
            
                          resultDiv.innerHTML += `<p><strong>Symptoms:</strong> ${symptoms}</p>`;
                          resultDiv.innerHTML += `<p><strong>Prevention:</strong> ${prevention}</p>`;
                          resultDiv.innerHTML += `<p><strong>Treatment:</strong> ${treatment}</p>`;
                        } else {
                          resultDiv.innerHTML = 'Condition not found.';
                        }
                      })
                      .catch(error => {
                        console.error('Error:', error);
                        resultDiv.innerHTML = 'An error occurred while fetching data.';
                      });
                  }
                    btnSearch.addEventListener('click', searchCondition);
              }
              {
                function generateReport() {
                    const numPatients = patients.length;
                    const conditionsCount = {
                      Diabetes: 0,
                      Thyroid: 0,
                      "High Blood Pressure": 0,
                    };
                    const genderConditionsCount = {
                      Male: {
                        Diabetes: 0,
                        Thyroid: 0,
                        "High Blood Pressure": 0,
                      },
                      Female: {
                        Diabetes: 0,
                        Thyroid: 0,
                        "High Blood Pressure": 0,
                      },
                    };
          
                    for (const patient of patients) {
                      conditionsCount[patient.condition]++;
                      genderConditionsCount[patient.gender][patient.condition]++;
                    }
          
                    report.innerHTML = `Number of patients: ${numPatients}<br><br>`;
                    report.innerHTML += `Conditions Breakdown:<br>`;
                    for (const condition in conditionsCount) {
                      report.innerHTML += `${condition}: ${conditionsCount[condition]}<br>`;
                    }
          
                    report.innerHTML += `<br>Gender-Based Conditions:<br>`;
                    for (const gender in genderConditionsCount) {
                      report.innerHTML += `${gender}:<br>`;
                      for (const condition in genderConditionsCount[gender]) {
                        report.innerHTML += `&nbsp;&nbsp;${condition}: ${genderConditionsCount[gender][condition]}<br>`;
                      }
                    }
                  }
          
              addPatientButton.addEventListener("click", addPatient);
              }
              
            }
          }
      }
    ]
  }
  