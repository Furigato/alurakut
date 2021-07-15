import { SiteClient } from 'datocms-client'

export default async function recebedorDeRequests(request, response) {

    if(request.method === 'POST') {
        const TOKEN = '14aa384e2a5e0592a2c7ea4bfeabbf';
        const client = new SiteClient(TOKEN);

        // Validar os dados antes de sair cadastrando
        const registroCriado = await client.items.create({
            itemType: "967708", // Id do Model "Communities" criado pelo Dato
            ...request.body,
            // title: "Comunidade de teste",
            // imageUrl: "https://github.com/furigato.png",
            // creatorSlug: "furigato"
        })

        response.json({
            dados: 'Algum dado qualquer',
            registroCriado: registroCriado,
        })
        return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
}

