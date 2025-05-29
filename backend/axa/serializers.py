from rest_framework import serializers
from .models import Devis

class DevisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Devis
        fields = ('id', 'numero_devis', 'nom_client', 'type_garantie', 'destination_ouvrage', 'type_travaux', 'cout_ouvrage', 'presence_existant', 'rcmo', 'client_vip', 'date_simulation', 'taux_trc', 'taux_do', 'description_ouvrage', 'adresse_chantier', 'fichier_pdf', 'fichier_word')
        extra_kwargs = {
            'id': {'read_only': True},
            'date_simulation': {'read_only': True},
            'fichier_pdf': {'read_only': True},
            'fichier_word': {'read_only': True},
        }