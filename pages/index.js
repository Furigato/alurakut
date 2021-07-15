import React from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileSidebar(propriedades) {
  return (
      <Box as="aside">

      <img src={ `https://github.com/${propriedades.githubUser}.png` } style={{ borderRadius: '8px' }}/>
        <hr />

          <p>
            <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
            @{propriedades.githubUser}
            </a>
          </p>

        <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(propriedades) {
    return (
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">
            {propriedades.title} ({propriedades.items.length})
          </h2>
          <ul>
            {/* {seguidores.map((itemAtual) => {
              return (
                <li key={itemAtual}>
                  <a href={`https://github.com/${itemAtual}.png`}>
                    <img src={itemAtual.image} />
                    <span>{itemAtual.title}</span>
                  </a>
                </li>
              )
            })} */}
          </ul>
        </ProfileRelationsBoxWrapper>
    )
}

export default function Home() {
  const usuarioAleatorio = 'furigato';
  const [comunidades, setComunidades] = React.useState([]);
  const pessoasFavoritas = [
    'brnofranco', 
    'leonardomleitao', 
    'madrigueira', 
    'guhma',
    'vitorpinheiro29',
    'lucasgabrielmello',
    'rafaballerini'
  ]

  // 0 - Pegar o array de dados do github
const [seguidores, setSeguidores] = React.useState([]);
  React.useEffect(function() {
    // GET
    fetch('https://api.github.com/users/furigato/followers')
    .then(function (respostaDoServidor) {
      return respostaDoServidor.json();
    })
    .then(function (respostaCompleta) {
      setSeguidores(respostaCompleta);
    })

    //API GraphQL
    fetch('https://graphql.datocms.com' , {
      method: 'POST',
      headers: {
        'Authorization': 'd1ab9a6d3771a0100a5a9c0f62e312',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ "query": `query {
        allCommunities {
          title
          id
          imageUrl
        }
      }` })
    })
    .then((response) => response.json())
    .then((respostaCompleta) => {
      const comunidadesVindasDoDato = respostaCompleta.data.allCommunities
      console.log(comunidades)
      setComunidades(comunidadesVindasDoDato)
    })

  }, [])

  // 1 - Criar um box que vai ter um map, baseado nos items do array proveniente do Github.

  return (
    <>
    <AlurakutMenu githubUser={usuarioAleatorio}/>
      <MainGrid>

      <div className="profileArea" style={{ gridArea: 'profileArea' }}>
        <ProfileSidebar githubUser={usuarioAleatorio}/>
      </div>
      <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
        <Box>
          <h1 className="title">
            Bem Vindo (a)
          </h1>

          <OrkutNostalgicIconSet />
        </Box>

        <Box>
          <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();
              const dadosDoForm = new FormData(e.target);

              const comunidade = {
                title:  dadosDoForm.get('title'),
                imageUrl:  dadosDoForm.get('image'),
                creatorSlug: usuarioAleatorio
              }

              fetch('/api/comunidades', {
                method:"POST",
                headers: {
                  'Content-type': 'application/json'
                },
                body: JSON.stringify(comunidade)
              })
              .then(async (response) => {
                const dados = await response.json();
                console.log(dados.registroCriado);
                const comunidade = dados.registroCriado
                const comunidadesAtualizadas = [...comunidades, comunidade]
                setComunidades(comunidadesAtualizadas)
              })

              // const comunidadesAtualizadas = [...comunidades, comunidade]
              // setComunidades(comunidadesAtualizadas)
            }}>
                <div>
                    <input 
                    placeholder="Qual vai ser o nome da sua comunidade?" 
                    name="title" 
                    aria-label="Qual vai ser o nome da sua comunidade?"
                    type="text"
                    />
                </div>
                <div>
                    <input 
                    placeholder="Coloque uma URL para usarmos de capa" 
                    name="image" 
                    aria-label="Coloque uma URL para usarmos de capa"
                    type="text"
                    />
                </div>

                <button>
                  Criar comunidade
                </button>

            </form>

        </Box>

      </div>
      <div className="profileRelationsArea " style={{ gridArea: 'profileRelationsArea'}}>

            <ProfileRelationsBox title ="Seguidores" items={seguidores} />

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/communities/${itemAtual.id}`}>
                      <img src={itemAtual.imageUrl} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
            Pessoas da Comunidade ({ pessoasFavoritas.length })
            </h2>

            <ul>
              { pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                  <a href={`/users/${itemAtual}`} key={itemAtual}>
                    <img src={`https://github.com/${itemAtual}.png`} />
                    <span>{itemAtual}</span>
                  </a>
                </li>
                )
              }) }
            </ul>
          </ProfileRelationsBoxWrapper>
      </div>
      </MainGrid>
    </>
  )
}
