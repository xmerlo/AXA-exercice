from django.db import models
from django.utils import timezone
from django.core.files.base import ContentFile
from django.template.loader import render_to_string
from weasyprint import HTML
from .utils import generer_docx
import os

class Devis(models.Model):
    GARANTIE_CHOICES = [
        ('DO', 'DO'),
        ('TRC', 'TRC'),
    ]

    DESTINATION_CHOICES = [
        ('HAB', 'Habitation'),
        ('HHAB', 'Hors habitation'),
    ]

    TYPES_TRAVAUX_CHOICES = [
        ('RLE', 'Rénovation légère'),
        ('RLO', 'Rénovation lourde'),
        ('ON', 'Ouvrage neuf'),
    ]

    numero_devis = models.CharField(max_length=50)
    nom_client = models.CharField(max_length=255)
    type_garantie = models.CharField(max_length=4, choices=GARANTIE_CHOICES)
    destination_ouvrage = models.CharField(max_length=4, choices=DESTINATION_CHOICES)
    type_travaux = models.CharField(max_length=4, choices=TYPES_TRAVAUX_CHOICES)
    cout_ouvrage = models.DecimalField(max_digits=12, decimal_places=2)
    presence_existant = models.BooleanField(default=False)
    client_vip = models.BooleanField(default=False)
    rcmo = models.BooleanField(default=False)
    date_simulation = models.DateTimeField(default=timezone.now)

    taux_trc = models.DecimalField(max_digits=5, decimal_places=2, help_text="En pourcentage, ex: 2.5 pour 2.5%")
    taux_do = models.DecimalField(max_digits=5, decimal_places=2, help_text="En pourcentage")

    description_ouvrage = models.TextField(blank=True)
    adresse_chantier = models.TextField(blank=True)

    fichier_pdf = models.FileField(upload_to='documents/pdf/', blank=True, null=True)
    fichier_word = models.FileField(upload_to='documents/word/', blank=True, null=True)

    def save(self, *args, **kwargs):

        super().save(*args, **kwargs)

        context = {
            'type_ouvrage': dict(self.DESTINATION_CHOICES).get(self.destination_ouvrage),
            'types_travaux': dict(self.TYPES_TRAVAUX_CHOICES).get(self.type_travaux),
            'cout_chantier': self.cout_ouvrage,
            'existant': 'Oui' if self.presence_existant else 'Non',
            'garantie': self.get_type_garantie_display(),
            'description': self.description_ouvrage,
            'adresse': self.adresse_chantier,
            'dommages_ouvrage': '123456789',
            'responsabilite_civile': '123456789',
            'maintenance': 'Inclus',
            'mesure_conservatoire': '10 000',
            'franchise_ouvrage': '5 000',
            'franchise_rc_maitre': '1 500',
            'franchise_maintenance': '0',
            'date_simulation': self.date_simulation.strftime('%d/%m/%Y'),
        }

        html_string = render_to_string('attestation_template.html', context)
        pdf_bytes = HTML(string=html_string).write_pdf()
        self.fichier_pdf.save(f"devis_{self.id}.pdf", ContentFile(pdf_bytes), save=False)

        docx_path = generer_docx(context)
        with open(docx_path, 'rb') as f:
            self.fichier_word.save(f"devis_{self.id}.docx", ContentFile(f.read()), save=False)
        os.remove(docx_path)

        super().save(update_fields=['fichier_pdf', 'fichier_word'])

    @property
    def prime_trc(self):
        return round(self.cout_ouvrage * (self.taux_trc / 100), 2)

    @property
    def prime_do(self):
        return round(self.cout_ouvrage * (self.taux_do / 100), 2)

    @property
    def prime_duo(self):
        return round(self.prime_trc + self.prime_do, 2)

    def __str__(self):
        return f"Devis {self.numero_devis} - {self.nom_client}"
