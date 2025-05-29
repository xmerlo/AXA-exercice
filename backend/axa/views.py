from django.shortcuts import render
from rest_framework import viewsets
from .serializers import DevisSerializer
from .models import Devis
from django.http import HttpResponse
from weasyprint import HTML
from datetime import date
from django.template.loader import render_to_string
from .utils import generer_docx
from django.http import HttpResponse, Http404
import mimetypes
import os

class DevisView(viewsets.ModelViewSet):
    serializer_class = DevisSerializer
    queryset = Devis.objects.all()


def generate_attestation(request):
    context = {
        'type_ouvrage': 'Habitation',
        'types_travaux': 'rénovation légère',
        'cout_chantier': '250 000',
        'existant': 'Oui',
        'garantie': 'DO + TRC',
        'description': 'Maison individuelle avec extension',
        'adresse': '123 rue de l’Exemple, Paris',
        'dommages_ouvrage': '300 000',
        'responsabilite_civile': '150 000',
        'maintenance': 'Inclus',
        'mesure_conservatoire': '10 000',
        'franchise_ouvrage': '5 000',
        'franchise_rc_maitre': '1 500',
        'franchise_maintenance': '0',
        'date_simulation': date.today().strftime('%d/%m/%Y'),
    }

    # 1. Génération PDF
    html_string = render_to_string('attestation_template.html', context)
    pdf = HTML(string=html_string).write_pdf()

    # 2. Génération DOCX
    docx_path = generer_docx(context)

    # 3. Retourne le PDF à télécharger
    response = HttpResponse(pdf, content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename="attestation.pdf"'
    return response

def telecharger_attestation(request, devis_id, format):
    try:
        devis = Devis.objects.get(id=devis_id)
    except Devis.DoesNotExist:
        raise Http404("Devis non trouvé")

    if format == 'pdf':
        fichier = devis.fichier_pdf
    elif format == 'word':
        fichier = devis.fichier_word
    else:
        raise Http404("Format invalide")

    if not fichier or not fichier.name:
        raise Http404("Fichier non généré")

    file_path = fichier.path
    file_name = os.path.basename(file_path)
    file_mimetype, _ = mimetypes.guess_type(file_path)

    with open(file_path, 'rb') as f:
        response = HttpResponse(f.read(), content_type=file_mimetype or 'application/octet-stream')
        response['Content-Disposition'] = f'attachment; filename="{file_name}"'
        return response
