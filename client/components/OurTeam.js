import React, { Component } from 'react';
import { Typography, Avatar } from '@material-ui/core';

export default class OurTeam extends Component {
  render() {
    return (
      <div className="sectionContainer bio">
        <Typography
          variant="h1"
          align="left"
          style={{ fontFamily: 'Georgia, serif', color: '#414C56' }}
        >
          Our Team
        </Typography>
        <div className="profiles">
          <div className="profileContainer">
            <div className="photoPosition">
              <img
                className="photo position"
                src={require('../../public/kevin_headshot.jpg')}
              />
            </div>
            <Typography
              align="center"
              variant="h4"
              style={{ fontFamily: 'Georgia, serif', padding: '10px' }}
            >
              Kevin Hu
            </Typography>
            <Typography
              align="center"
              variant="body1"
              style={{ fontFamily: 'Georgia, serif', padding: '10px' }}
            >
              I am most accurately a multidisciplinary writer -- passionate
              about the human story and in building ideas through text that
              flourish the humans in these stories. As a Software Developer, I
              spend most of my time writing text in the NERDS stack but also
              dabble with Google tools and technologies. As a freelance writer,
              I spend most of my time writing in the Asian American writing
              space.{' '}
            </Typography>
            <div className="avatarContainer">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/kevin-hu-82673529/"
              >
                <Avatar
                  className="avatar"
                  src="../../public/linkedin_circle.png"
                />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/pkvinhu"
              >
                <Avatar
                  className="avatar"
                  src="../../public/github_circle.png"
                />
              </a>
            </div>
          </div>
          <div className="profileContainer">
            <div className="photoPosition">
              <img
                className="photo position2"
                src={require('../../public/harry_headshot.JPG')}
              />
            </div>
            <Typography
              align="center"
              variant="h4"
              style={{ fontFamily: 'Georgia, serif', padding: '10px' }}
            >
              Harry Chen
            </Typography>
            <Typography
              align="center"
              variant="body1"
              style={{ fontFamily: 'Georgia, serif', padding: '10px' }}
            >
              I am a part-time procrastinator, part-time meme connoisseur, and
              full-time web architect of anything agile, clean, and scalable. I
              am always on the lookout for up and coming technologies. Currently
              dabbling with WebRTC.
            </Typography>
            <div className="avatarContainer">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/harrychenhc/"
              >
                <Avatar
                  className="avatar"
                  src="../../public/linkedin_circle.png"
                />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/phaseharry"
              >
                <Avatar
                  className="avatar"
                  src="../../public/github_circle.png"
                />
              </a>
            </div>
          </div>
          <div className="profileContainer">
            <div className="photoPosition">
              <img
                className="photo position2"
                src={require('../../public/kaz_headshot.jpg')}
              />
            </div>
            <Typography
              align="center"
              variant="h4"
              style={{ fontFamily: 'Georgia, serif', padding: '10px' }}
            >
              Kaz Kabyldenov
            </Typography>
            <Typography
              align="center"
              variant="body1"
              style={{ fontFamily: 'Georgia, serif', padding: '10px' }}
            >
              I am a lingua-enthusiast and a tech fanatic. Have a big passion
              for everything that runs in the backend, and can truly appreciate
              clean and intuitive UI! Spend my free time coding and playing
              around with hardware/robotics projects. Go Badgers!
            </Typography>
            <div className="avatarContainer">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/kazniyaz/"
              >
                <Avatar
                  className="avatar"
                  src="../../public/linkedin_circle.png"
                />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/Kazniyaz"
              >
                <Avatar
                  className="avatar"
                  src="../../public/github_circle.png"
                />
              </a>
            </div>
          </div>
          <div className="profileContainer">
            <div className="photoPosition">
              <img
                className="photo position2"
                src={require('../../public/_DSC9989.jpg')}
              />
            </div>
            <Typography
              align="center"
              variant="h4"
              style={{ fontFamily: 'Georgia, serif', padding: '10px' }}
            >
              Daniel Seeley
            </Typography>
            <Typography
              align="center"
              variant="body1"
              style={{ fontFamily: 'Georgia, serif', padding: '10px' }}
            >
              Broad understanding of media production technology and creative
              techniques. Excels in communicating the big picture with charisma
              and imaginative thinking. Diverse background in business
              development, team leadership, sales, IT and web technologies.
              Loves beautiful lighting, late nights with Adobe, and Brooklyn
              Rock and Soul.
            </Typography>
            <div className="avatarContainer">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/in/daniel-seeley-54650813/"
              >
                <Avatar
                  className="avatar"
                  src="../../public/linkedin_circle.png"
                />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/D-Seeley"
              >
                <Avatar
                  className="avatar"
                  src="../../public/github_circle.png"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
