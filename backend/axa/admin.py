from django.contrib import admin
from .models import Devis

class DevisAdmin(admin.ModelAdmin):
    list_display = ('id', 'numero_devis', 'nom_client', 'type_garantie', 'destination_ouvrage', 'type_travaux', 'cout_ouvrage', 'presence_existant', 'rcmo', 'client_vip', 'date_simulation', 'taux_trc', 'taux_do', 'description_ouvrage', 'adresse_chantier', 'fichier_pdf', 'fichier_word')

admin.site.register(Devis)
