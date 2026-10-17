import { useEffect, useState } from 'react'
import MatrixRain from './MatrixRain.jsx'
import TextCursor from './TextCursor.jsx'

const SECTIONS = ['home', 'resume', 'contact']

const AI_SKILLS = [
  'LangChain / Dify',
  'RAG / GraphRAG',
  'LoRA / QLoRA / PEFT',
  'vLLM / DeepSpeed',
  'PyTorch / Transformers',
  'Prompt Engineering',
]

const ENGINEERING_SKILLS = [
  'Java / Spring Boot',
  'Python / FastAPI',
  'Vue.js / TypeScript',
  'Docker / K8s',
  'MySQL / Redis / Milvus',
]

const CONTACTS = [
  {
    label: 'Email',
    value: 'rudrakshaishere@gmail.com',
    tooltip: 'rudrakshaishere@gmail.com',
    icon: 'mail',
  },
  {
    label: 'GitHub',
    value: 'https://github.com/RiaHello',
    tooltip: 'https://github.com/RiaHello',
    icon: 'github',
  },
  {
    label: '微信',
    value: 'Ria_is_here',
    tooltip: '微信号：Ria_is_here',
    icon: 'wechat',
  },
]

function readSection() {
  const hash = window.location.hash.replace('#', '')
  return SECTIONS.includes(hash) ? hash : 'home'
}

function Letters({ chars, className, delay, step }) {
  return chars.map((char, index) => (
    <span
      key={`${char}-${index}`}
      className={`hero-letter cursor-target ${className}`}
      style={{ animationDelay: `${delay + index * step}s` }}
    >
      {char === ' ' ? '\u00A0' : char}
    </span>
  ))
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

function WechatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

const ICONS = {
  mail: MailIcon,
  github: GitHubIcon,
  wechat: WechatIcon,
}

export default function App() {
  const [section, setSection] = useState(readSection)
  const [transitioning, setTransitioning] = useState(false)
  const [entered, setEntered] = useState(false)
  const [riaHovered, setRiaHovered] = useState(false)
  const [toast, setToast] = useState('')
  const [toastOk, setToastOk] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setEntered(true), 80)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const syncSection = () => setSection(readSection())
    window.addEventListener('hashchange', syncSection)
    window.addEventListener('popstate', syncSection)
    return () => {
      window.removeEventListener('hashchange', syncSection)
      window.removeEventListener('popstate', syncSection)
    }
  }, [])

  useEffect(() => {
    if (!toast) {
      return undefined
    }
    const timer = window.setTimeout(() => setToast(''), 2000)
    return () => window.clearTimeout(timer)
  }, [toast])

  const go = (next) => {
    if (next === section || transitioning) {
      return
    }
    setTransitioning(true)
    window.setTimeout(() => {
      setSection(next)
      const hash = `#${next}`
      if (window.location.hash !== hash) {
        window.history.pushState(null, '', hash)
      }
    }, 280)
    window.setTimeout(() => setTransitioning(false), 640)
  }

  const copyText = async (value) => {
    try {
      await navigator.clipboard.writeText(value)
      return true
    } catch {
      const input = document.createElement('textarea')
      input.value = value
      input.setAttribute('readonly', '')
      input.style.position = 'fixed'
      input.style.left = '-9999px'
      document.body.appendChild(input)
      input.select()
      const copied = document.execCommand('copy')
      document.body.removeChild(input)
      return copied
    }
  }

  const copyContact = async (item) => {
    const copied = await copyText(item.value)
    setToastOk(copied)
    setToast(copied ? `已复制 ${item.label}: ${item.value}` : '复制失败，请重试')
  }

  return (
    <TextCursor className="page" text="Annie" color="#b7ff3b" fontWeight={700}>
      {transitioning && (
        <div className="page-transition" aria-hidden="true">
          <span className="scan-line" />
        </div>
      )}
      <MatrixRain />
      <div className="bg-grid" aria-hidden="true">
        {Array.from({ length: 20 }, (_, index) => (
          <span key={index} className="grid-line" />
        ))}
      </div>
      <div className="decorations" aria-hidden="true">
        <span className="deco-square deco-1" />
        <span className="deco-square deco-2" />
        <span className="deco-square deco-3" />
        <span className="deco-square deco-4" />
        <span className="deco-square deco-5" />
        <span className="deco-dot deco-dot-1" />
        <span className="deco-dot deco-dot-2" />
      </div>

      <div className={`logo-container${entered ? ' logo-visible' : ''}`}>
        <div className="logo-icon">
          <span className="logo-letter">A</span>
        </div>
        <span className="logo-name">Annie</span>
      </div>

      <nav className="nav" aria-label="主导航">
        <ul className="nav-list">
          {[
            ['home', '首页'],
            ['resume', '生长线'],
            ['contact', '联系我'],
          ].map(([id, label]) => (
            <li key={id}>
              <a
                className={`nav-link cursor-target${section === id ? ' nav-link--active' : ''}`}
                href={`#${id}`}
                aria-current={section === id ? 'page' : undefined}
                onClick={(event) => {
                  event.preventDefault()
                  go(id)
                }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {section === 'home' && (
        <main className={`hero${entered ? ' hero-visible' : ''}`}>
          <h1>
            <span className="hero-line hero-line--top">
              <Letters chars={['H', 'I', ',']} className="text-white" delay={0} step={0.08} />
            </span>
            <span className="hero-line hero-line--bottom">
              <Letters
                chars={['H', 'E', 'R', 'E', ' ', 'I', 'S', ' ']}
                className="text-white"
                delay={0.3}
                step={0.06}
              />
              <span
                className={`ria-group cursor-target${riaHovered ? ' ria-hovered' : ''}`}
                onMouseEnter={() => setRiaHovered(true)}
                onMouseLeave={() => setRiaHovered(false)}
              >
                <Letters
                  chars={['A', 'n', 'n', 'i', 'e']}
                  className="ria-letter text-lime"
                  delay={0.3 + 8 * 0.06}
                  step={0.06}
                />
              </span>
            </span>
          </h1>
          <div className={`subtitle${riaHovered ? ' subtitle-visible' : ''}`}>
            <p className="subtitle-tags">极客 · 产品 · 项目思维</p>
            <p className="subtitle-text">你好~这里是石耳，也叫Annie</p>
          </div>
          <div className="cta-group">
            <button type="button" className="cta-btn cursor-target" onClick={() => go('resume')}>
              <span>关于我</span>
              <svg className="arrow-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button type="button" className="cta-btn cta-btn-outline cursor-target" onClick={() => go('contact')}>
              <span>联系我</span>
              <svg className="arrow-down" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </main>
      )}

      {section === 'home' && (
        <div className="scroll-hint" aria-hidden="true">
          <span className="scroll-text">SCROLL</span>
          <span className="scroll-line" />
        </div>
      )}

      {section === 'resume' && (
        <main className="resume-page">
          <div className="resume-container">
            <header className="resume-header">
              <h2 className="resume-title">关于我</h2>
              <p className="resume-subtitle">About Me</p>
            </header>
            <div className="resume-content">
              <section className="resume-section">
                <h3 className="section-title">个人简介</h3>
                <p className="section-text">
                  你好，我是陈科瑾（Annie）。
                  <br />
                  具备 <strong>AI 大模型应用</strong> 与 <strong>全栈开发</strong> 能力的{' '}
                  <strong>AI 产品经理</strong>。
                  <br />
                  <br />
                  致力于将前沿的 AI 技术（Transformers, LangChain, RAG）转化为实际落地的商业价值。
                  拥有扎实的工程底座，融合 <strong>Java (Spring Boot)</strong> 与 <strong>Python</strong>{' '}
                  双栈技术，结合 <strong>Docker/K8s</strong>{' '}
                  容器化部署经验，构建高效、可扩展的智能化解决方案。
                  <br />
                  <br />
                  热衷于探索 <strong>Multi-Agent</strong> 协作与 <strong>GraphRAG</strong>{' '}
                  知识图谱增强生成技术，推动产品从 0 到 1 的创新与迭代。
                </p>
              </section>

              <div className="resume-grid">
                <article className="resume-card">
                  <h4 className="card-title">AI 技术栈</h4>
                  <ul className="skill-list">
                    {AI_SKILLS.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </article>
                <article className="resume-card">
                  <h4 className="card-title">工程技术栈</h4>
                  <ul className="skill-list">
                    {ENGINEERING_SKILLS.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </article>
              </div>

              <section className="resume-section">
                <h3 className="section-title">工作经历</h3>
                <div className="timeline">
                  <article className="timeline-item">
                    <span className="timeline-dot" />
                    <div className="timeline-content">
                      <h4 className="timeline-role">AI 产品经理 @ 顺丰速运</h4>
                      <p className="timeline-desc">
                        负责「丰晓易」智能助手 Agent 化升级与核心场景落地。
                        <br />• 覆盖账单触达、差异查因、调账、发票服务、支付核销{' '}
                        <strong>5 类月结结算场景</strong>，完成需求优先级、业务规则与验收口径定义
                        <br />• 参与治理 <strong>500+ 份业务文档</strong>、沉淀{' '}
                        <strong>150+ 对标准 QA</strong>，完成 6 类 RAG 知识域与 7 类只读 API Tools 的能力映射
                        <br />• 参与建立分层评测与版本迭代机制，推动意图识别准确率{' '}
                        <strong>93%+</strong>、RAG 召回率 <strong>96%+</strong>
                      </p>
                    </div>
                  </article>
                  <article className="timeline-item">
                    <span className="timeline-dot" />
                    <div className="timeline-content">
                      <h4 className="timeline-role">AI 应用开发 / AI 产品经理 @ 浙大网新</h4>
                      <p className="timeline-desc">
                        参与企业级数据与 AI 中台、智能外呼系统建设。
                        <br />• 负责「大先生」Corpus 语料库与文件管理模块后端开发，参与模型训练与部署链路维护
                        <br />• 参与政企业务材料智能审核应用原型：基于 <strong>Dify</strong>{' '}
                        串联材料解析、字段抽取、规则校验与人工复核
                      </p>
                    </div>
                  </article>
                  <article className="timeline-item">
                    <span className="timeline-dot" />
                    <div className="timeline-content">
                      <h4 className="timeline-role">AI 工程师 @ 智谱华章</h4>
                      <p className="timeline-desc">
                        核心参与 <strong>Critic（思维链评判模型）</strong>
                        项目研发，负责训练数据建设与标注团队协同。
                        <br />• 设计并构建高质量 <strong>Chain of Thought (CoT)</strong> 训练数据集，通过{' '}
                        <strong>Step-by-Step</strong> 推理路径增强模型在复杂数学与代码任务中的表现
                        <br />• 参与 <strong>Process Reward Model (PRM)</strong> 的训练与验证，优化{' '}
                        <strong>RLHF (PPO)</strong> 算法中的奖励机制，使模型具备细粒度逻辑验证与{' '}
                        <strong>Self-Correction（自我修正）</strong>能力
                        <br />• 制定 <strong>Span 任务标注规则</strong>，完成 4 批共{' '}
                        <strong>48,000 条</strong>训练样本的清洗与质量复核；培训并协同{' '}
                        <strong>20+ 名</strong>线上实习生，累计交付 <strong>100,000+ 条</strong>
                        标注数据，返修率从 30% 降至 <strong>12%</strong>
                      </p>
                    </div>
                  </article>
                </div>
              </section>
            </div>
          </div>
        </main>
      )}

      {section === 'contact' && (
        <main className="about-page">
          <div className="about-content">
            <div className="avatar-container">
              <div className="avatar-wrapper">
                <img src="/avatar.png" alt="石耳的头像" className="avatar" />
              </div>
              <div className="avatar-glow" />
            </div>
            <div className="about-info">
              <p className="about-name">石耳</p>
              <p className="about-role">极客 · 产品 · 项目思维</p>
              <div className="about-divider" />
              <p className="about-desc">
                热爱技术与设计的创造者，专注于打造有温度的数字产品。相信好的产品是技术与艺术的完美结合。
              </p>
            </div>
            <h2 className="about-title">Coffee Chat</h2>
            <div className="contact-links">
              {CONTACTS.map((item) => {
                const Icon = ICONS[item.icon]
                return (
                  <button
                    key={item.label}
                    type="button"
                    className="contact-link cursor-target"
                    data-tooltip={item.tooltip}
                    onClick={() => copyContact(item)}
                  >
                    <Icon />
                    <span>{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </main>
      )}

      <div
        className={`toast-notification${toast ? ' toast-visible' : ''}${toastOk ? ' toast-ok' : ''}`}
        role="status"
      >
        {toast}
      </div>
    </TextCursor>
  )
}
