import { Camera, Clapperboard, Film, Megaphone } from 'lucide-react';

const Iridescent3DIcon = ({ icon: Icon, size = 180, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      {/* Iridescent Gradient Definition */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="irid-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#60A5FA', stopOpacity: 1 }} />
            <stop offset="25%" style={{ stopColor: '#A855F7', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#EC4899', stopOpacity: 1 }} />
            <stop offset="75%" style={{ stopColor: '#2DD4BF', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#60A5FA', stopOpacity: 1 }} />
          </linearGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* The Icon itself styled to look 3D and Iridescent */}
      <div className="relative group transition-transform duration-700 hover:scale-110">
        {/* Outer Glow */}
        <div className="absolute inset-0 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-teal-400" />
        
        {/* Main Icon with 3D drop shadows and gradient stroke */}
        <Icon 
          size={size}
          strokeWidth={1.2}
          style={{ 
            stroke: 'url(#irid-grad)',
            filter: 'url(#glow) drop-shadow(4px 4px 2px rgba(0,0,0,0.5)) drop-shadow(-1px -1px 1px rgba(255,255,255,0.2))'
          }}
          className="relative z-10"
        />
      </div>
    </div>
  );
};

export const FilmCameraIcon = (props) => <Iridescent3DIcon icon={Camera} {...props} />;
export const ClapperboardIcon = (props) => <Iridescent3DIcon icon={Clapperboard} {...props} />;
export const FilmReelIcon = (props) => <Iridescent3DIcon icon={Film} {...props} />;
export const MegaphoneIcon = (props) => <Iridescent3DIcon icon={Megaphone} {...props} />;
