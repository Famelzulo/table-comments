import React, { useState } from 'react';
import { Table, Button, Input, Tabs, Badge, Breadcrumb, Layout, Typography, Row, Col, Card, Tooltip, Avatar } from 'antd';
import { DeleteOutlined, CloseOutlined, CheckOutlined, UserOutlined } from '@ant-design/icons';
import data from './data';
import './Table.css';
    
const { TextArea } = Input;
const { Header, Content } = Layout;
const { Title } = Typography;

const usuario = 'Marion Zuloaga';

const TableComponent = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [comment, setComment] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [lastSaved, setLastSaved] = useState(null);
  const [showSaved, setShowSaved] = useState(false);
  const [showRequired, setShowRequired] = useState(false);

  // Para expandir filas
  const expandedRowRender = (record) => {
    if (!record.subItems || record.subItems.length === 0) return null;
    return (
      <Table
        columns={subColumns}
        dataSource={record.subItems.map((item, idx) => ({ ...item, key: idx }))}
        pagination={false}
        rowKey="codigo"
        size="small"
      />
    );
  };

  // Solo mostrar panel al hacer click en la X roja
  const handleObservationClick = (record) => {
    setSelectedRow(record);
    setComment('');
    setCharCount(0);
    setShowSaved(false);
    setLastSaved(null);
  };

  const handleSave = () => {
    if (comment.trim() === '') {
      setShowRequired(true);
      return;
    }
    const now = new Date();
    setLastSaved(now);
    setShowSaved(true);
    setShowRequired(false);
  };

  const handleClear = () => {
    setComment('');
    setCharCount(0);
    setShowRequired(false);
  };

  const columns = [
    {
      title: 'Código',
      dataIndex: 'codigo',
      width: 100,
    },
    {
      title: 'Denominación',
      dataIndex: 'denominacion',
      width: 400,
    },
    {
      title: 'Tipo',
      dataIndex: 'tipo',
      width: 100,
      render: () => '',
    },
    {
      title: 'Opciones',
      width: 120,
      render: (_, record) => (
        <div className="table-actions">
          <Tooltip title="Aprobar">
            <Button shape="circle" className="icon-btn icon-btn-green-outline" size="small" icon={<CheckOutlined />} />
          </Tooltip>
          <Tooltip title="Observaciones">
            <Button
              shape="circle"
              className="icon-btn icon-btn-red-outline"
              size="small"
              icon={<CloseOutlined />}
              onClick={() => handleObservationClick(record)}
            />
          </Tooltip>
          <Tooltip title="Rechazar">
            <Button shape="circle" className="icon-btn icon-btn-blue-outline" size="small" icon={<DeleteOutlined />} />
          </Tooltip>
        </div>
      ),
    },
  ];

  const subColumns = [
    {
      title: 'Código',
      dataIndex: 'codigo',
      width: 100,
    },
    {
      title: '¿Es articulado?',
      dataIndex: 'articulado',
      width: 120,
    },
    {
      title: 'Inversión Estratégica',
      dataIndex: 'inversion',
      width: 250,
    },
    {
      title: 'Opciones',
      width: 120,
      render: (_, record) => (
        <div className="table-actions">
          <Tooltip title="Aprobar">
            <Button shape="circle" className="icon-btn icon-btn-green-outline" size="small" icon={<CheckOutlined />} />
          </Tooltip>
          <Tooltip title="Observaciones">
            <Button
              shape="circle"
              className="icon-btn icon-btn-red-outline"
              size="small"
              icon={<CloseOutlined />}
              onClick={() => handleObservationClick(record)}
            />
          </Tooltip>
          <Tooltip title="Rechazar">
            <Button shape="circle" className="icon-btn icon-btn-blue-outline" size="small" icon={<DeleteOutlined />} />
          </Tooltip>
        </div>
      ),
    },
  ];

  function formatDate(date) {
    if (!date) return '';
    return date.toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: '2-digit' }) +
      ', ' + date.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  return (
    <Layout style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      {/* Header superior */}
      <Header className="custom-header">
        <Row align="middle" justify="space-between">
          <Col>
            <img src="/logo192.png" alt="Logo" style={{ height: 40, marginRight: 16 }} />
            <span className="header-title">Sector: OT - Presidencia Consejo Ministros</span>
          </Col>
          <Col>
            <UserOutlined style={{ fontSize: 20, color: '#fff', marginRight: 8 }} />
            <span className="header-user">Marion Zuloaga</span>
          </Col>
        </Row>
      </Header>
      <Content style={{ padding: 0 }}>
        <div className="breadcrumbs-bar">
          <Breadcrumb>
            <Breadcrumb.Item>Inicio</Breadcrumb.Item>
            <Breadcrumb.Item>Breadcrumb 2</Breadcrumb.Item>
            <Breadcrumb.Item>Breadcrumb 3</Breadcrumb.Item>
            <Breadcrumb.Item>Breadcrumb 4</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="main-card main-flex">
          <div className={`main-table-area${selectedRow ? ' with-observation' : ''}`}>
            <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
              <Col>
                <Title level={4} style={{ margin: 0 }}>Articulación: PEI 2020–2025 <Button size="small">Revisión</Button></Title>
              </Col>
              <Col>
                <div className="counters">
                  <span>PM <Badge count={0} style={{ backgroundColor: '#bfbfbf' }} /></span>
                  <span>POL. N <Badge count={6} style={{ backgroundColor: '#bfbfbf' }} /></span>
                  <span>PGG <Badge count={10} style={{ backgroundColor: '#bfbfbf' }} /></span>
                  <span>INV. E <Badge count={10} style={{ backgroundColor: '#bfbfbf' }} /></span>
                </div>
              </Col>
            </Row>
            <Tabs defaultActiveKey="4" className="custom-tabs">
              <Tabs.TabPane tab="PLAN MAYOR" key="1" />
              <Tabs.TabPane tab="POL. NACIONAL" key="2" />
              <Tabs.TabPane tab="PGG" key="3" />
              <Tabs.TabPane tab={<b>INV. ESTRATÉGICAS</b>} key="4" />
            </Tabs>
            <Card className="table-card">
              <Table
                columns={columns}
                dataSource={data.map((item, idx) => ({ ...item, key: idx }))}
                rowKey="codigo"
                pagination={false}
                expandable={{ expandedRowRender }}
                size="middle"
              />
            </Card>
          </div>
          {selectedRow && (
            <div className="right-panel obs-panel">
              <div className="obs-title-row">
                <span className="obs-title">Observaciones {selectedRow.codigo}</span>
                <Button type="text" className="obs-close" onClick={() => setSelectedRow(null)}>
                  <CloseOutlined />
                </Button>
              </div>
              <div className="obs-user-row">
                <Avatar style={{ backgroundColor: '#e53935', marginRight: 8 }} size={32}>
                  {usuario[0].toUpperCase()}
                </Avatar>
                <span className="obs-username">{usuario}</span>
              </div>
              <TextArea
                rows={6}
                maxLength={500}
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                  setCharCount(e.target.value.length);
                  if (showRequired) setShowRequired(false);
                }}
                placeholder=""
                className="obs-textarea"
              />
              <div className="obs-footer">
                <span className="obs-count">{charCount}/500</span>
                {showRequired && <span className="obs-error">Este campo es obligatorio.</span>}
              </div>
              {showSaved && lastSaved && (
                <div className="obs-saved">Último guardado: {formatDate(lastSaved)}</div>
              )}
              <div className="obs-actions">
                <Button onClick={handleClear} className="obs-btn-clear">Limpiar</Button>
                <Button type="primary" onClick={handleSave} className="obs-btn-save">Guardar</Button>
              </div>
            </div>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default TableComponent;
