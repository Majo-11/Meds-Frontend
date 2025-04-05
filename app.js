document.getElementById('MedicamentosForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const familyName = document.getElementById('familyName').value;
    const identifierSystem = document.getElementById('identifierSystem').value;
    const identifierValue = document.getElementById('identifierValue').value;
    const medicationCode = document.getElementById('medicationCode').value;
    const medicationDisplay = document.getElementById('medicationDisplay').value;
    const dosage = document.getElementById('dosage').value;
    const frequency = document.getElementById('frequency').value;
    const duration = document.getElementById('duration').value;

    const medicationRequest = {
        resourceType: "MedicationRequest",
        subject: {
            identifier: {
                system: identifierSystem,
                value: identifierValue
            },
            name: {
                given: name,
                family: familyName
            }
        },
        medicationCodeableConcept: {
            coding: [{
                system: "http://www.nlm.nih.gov/research/umls/rxnorm",
                code: medicationCode,
                display: medicationDisplay
            }]
        },
        dosageInstruction: [{
            text: `${dosage}, ${frequency} durante ${duration}`
        }]
    };

    fetch('https://hl7-fhir-ehr.onrender.com/medication-request', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(medicationRequest)
    })
    .then(response => {
        if (!response.ok) throw new Error("Error en el servidor");
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert('¡Solicitud de medicamento creada exitosamente!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error al enviar la solicitud.');
    });
});