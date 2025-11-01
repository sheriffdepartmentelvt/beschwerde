import './style.css'

const WEBHOOK_URL = 'https://discord.com/api/webhooks/1430490370835218552/6b8rXAUjteRbedVUN8_mJ-rkcIRW2aRDoasFRpoArGnB8Qlfv7Dhrj7fmVi5ZnyoMlGG';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('applicationForm');
  const successMessage = document.getElementById('successMessage');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Wird gesendet...</span>';
    submitBtn.disabled = true;

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const embed = {
      title: 'Neue Bewerbung - Los Santos Sheriff Department',
      color: 13938487,
      fields: [
        {
          name: 'Persönliche Informationen',
          value: '▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬',
          inline: false
        },
        {
          name: '(IC) Vorname Nachname:',
          value: data.fullName || 'Nicht angegeben',
          inline: true
        },
        {
          name: '(IC) Alter:',
          value: data.age || 'Nicht angegeben',
          inline: true
        },
        {
          name: '(IC) Telefonnummer:',
          value: data.phone || 'Nicht angegeben',
          inline: true
        },
        {
          name: 'E-Mail:',
          value: data.email || 'Nicht angegeben',
          inline: true
        },
        {
          name: 'Bewerbungsfragen',
          value: '▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬',
          inline: false
        },
        {
          name: 'Erfahrung in anderen Staats Fraktionen:',
          value: data.experience || 'Nicht angegeben',
          inline: false
        },
        {
          name: 'Motivation für LSSD:',
          value: data.motivation || 'Nicht angegeben',
          inline: false
        },
        {
          name: 'Stärken und Schwächen:',
          value: data.strengths || 'Nicht angegeben',
          inline: false
        },
        {
          name: 'Umgang mit stressigen Situationen:',
          value: data.situation || 'Nicht angegeben',
          inline: false
        },
        {
          name: 'Aktive Zeiten im Dienst:',
          value: data.availability || 'Nicht angegeben',
          inline: true
        },
        {
          name: 'Vorstrafen:',
          value: data.criminal || 'Nicht angegeben',
          inline: true
        },
        {
          name: 'Zusätzliche Informationen:',
          value: data.additional || 'Keine',
          inline: false
        }
      ],
      footer: {
        text: 'Los Santos Sheriff Department - Bewerbungssystem'
      },
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          embeds: [embed],
          username: 'LSSD Bewerbungssystem'
        })
      });

      if (response.ok) {
        form.reset();
        successMessage.classList.remove('hidden');
        
        setTimeout(() => {
          successMessage.classList.add('hidden');
        }, 5000);
      } else {
        const errorText = await response.text();
        console.error('Discord API Error:', errorText);
        alert('Es gab ein Problem beim Senden der Bewerbung. Bitte versuchen Sie es erneut.');
      }
    } catch (error) {
      console.error('Network Error:', error);
      alert('Es gab ein Netzwerkproblem. Bitte überprüfen Sie Ihre Internetverbindung.');
    } finally {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
  });

  successMessage.addEventListener('click', () => {
    successMessage.classList.add('hidden');
  });
});